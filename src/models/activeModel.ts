import Model from './model'
import StaticModel from './staticModel'
import StaticModelValidator from '../validation/validators/staticModelValidator'
import Validator from '../validation/validator'
import { ActiveModelData, ActiveModelErrors, ActiveModelInterface, ArrayAttributeConstructor, Condition, DataInterfaceFunction, ModelSchema, PrimitiveConstructors } from '../types/models/model'
import { addActiveRow, getActiveRow, getActiveTable, setActiveRow } from '../data/activeDataInterface'
import { ErrorMessages, GenericValidatorOptions } from '../types/validation/validator'
import { Request } from 'express'
import { TableRow } from '../types/data/tables'
import { utils } from '..'
import { ValidationSchema, ValidationScheme } from '../types/validation/validationSchema'

abstract class ActiveModel extends Model implements ActiveModelInterface {
  data: ActiveModelData = this.data

  abstract tableName: string
  abstract modelSchema: ModelSchema
  abstract validationSchema: ValidationSchema

  errors: ActiveModelErrors = {}

  constructor(data: ActiveModelData) {
    super(data)
  }

  // TODO: Possilby static init model

  protected static _find = getActiveRow

  protected static _all = (req: Request, tableName: string): Array<ActiveModelData> => {
    return getActiveTable(req, tableName)
  }

  protected static _where = (req: Request, tableName: string, conditions: Array<Condition>): Array<ActiveModelData> => {
    return getActiveTable(req, tableName, conditions)
  }

  protected static count = (req: Request, tableName: string, conditions: Array<Condition>): number => {
    return this._where(req, tableName, conditions).length
  }

  protected static nextID = (req: Request, tableName: string): number => {
    const data: ActiveModelData[] = this._all(req, tableName)

    if (data.length === 0) {
      return 1
    } else {
      return Math.max(...data.map(modelData => modelData.id)) + 1
    }
  }

  protected beforeValidate?(): void

  validate = (call: string) => {
    this.beforeValidate && this.beforeValidate()

    this.errors = {}

    if (this.validationSchema.inputValidations !== undefined){
      this.validationSchema.inputValidations.forEach(inputValidation => {
        // TODO: Change from any
        this.validateAttribute(call, inputValidation, inputValidation.validator as any)
      })
    }

    if (this.validationSchema.customValidations !== undefined) {
      this.validationSchema.customValidations.forEach(customValidation => {
        this.validateAttribute(call, customValidation, customValidation.validator)
      })
    }

    if (this.validationSchema.staticModelValidations !== undefined) {
      this.validationSchema.staticModelValidations.forEach(staticModelValidation => {
        // TODO: Change from any
        this.validateAttribute(call, staticModelValidation, StaticModelValidator as any)
      })
    }

    Object.keys(this.data)
      .filter((attribute: string) => this.data[attribute] instanceof ActiveModel)
      .forEach((attribute: string) => {
        const model = this.data[attribute]

        if (!model.validate(call)) {
          this.errors = {...this.errors, ...model.errors}
        }
      })

    return Object.keys(this.errors).length === 0
  }

  private validateAttribute = (call: string, validation: ValidationScheme, ValidatorSubclass: new (model: ActiveModel, attribute: string, errorMessages: ErrorMessages, options: GenericValidatorOptions) => Validator) => {
    const attributeValidation: Validator = new ValidatorSubclass(this, validation.attribute, validation.errorMessages, validation.options)

    attributeValidation.valid(call)
  }

  addError = (attribute: string, error: string, message: string): void => {
    this.errors[attribute] = {
      error: error,
      errorMessage: message
    }
  }

  errorList = () => {
    return Object.entries(this.errors).map(([attribute, error]) => {
      return {
        text: error.errorMessage,
        href: `#${attribute}-error`
      }
    })
  }

  attributes = (): TableRow => {
    return Object.fromEntries(Object.keys(this.modelSchema).map((attribute) => {
      if(this.modelSchema[attribute].constructor.prototype instanceof Model) {
        let attributeValue: number|undefined

        if (this.data[attribute] === undefined) {
          attributeValue = undefined
        } else {
          attributeValue = (this.data[attribute] as Model).data.id
        }
        return [`${attribute}ID`, attributeValue]
      } else {
        return [attribute, this.data[attribute]]
      }
    })) as TableRow
  }

  assignAttributes = (data: ActiveModelData): void  => {
    if (data === undefined) return

    for (const attribute in this.modelSchema) {
      if (attribute in data) {
        const attributeConstructor = this.modelSchema[attribute]

        if (attributeConstructor.constructor.prototype instanceof ActiveModel) {
          (this.data[attribute] as ActiveModel).assignAttributes(data[attribute])
        } else if (attributeConstructor.constructor.prototype instanceof StaticModel) {
          const id = utils.cast(data[attribute], Number)

          if (this.data[attribute] === undefined || (this.data[attribute] as StaticModel).data.id !== id) {
            // TODO: Chnage to somthing that is not any
            this.data[attribute] = (attributeConstructor.constructor as any).find(id)
          }
        } else {
          switch(attributeConstructor.constructor) {
          case Array:
            if (data[attribute] === undefined) {
              this.data[attribute] = []
            } else {
              this.data[attribute] = data[attribute].map((element: string) => utils.cast(element, (attributeConstructor as ArrayAttributeConstructor).arrayItemConstuctor))
            }
            break
          case Date:
            this.data[attribute] = `${utils.addLeadingZeros(data[attribute][2] as number, 4)}-${utils.addLeadingZeros(data[attribute][1] as number, 2)}-${utils.addLeadingZeros(data[attribute][0] as number, 2)}`
            break
          default:
            this.data[attribute] = utils.cast(data[attribute], attributeConstructor.constructor as PrimitiveConstructors)
          }
        }
      }
    }
  }

  private _save = (req: Request, dataInterface: DataInterfaceFunction): void => {
    const activeModelAttributes: Array<string> = Object.keys(this.data).filter((attribute) => this.data[attribute] instanceof ActiveModel)

    activeModelAttributes.forEach(activeModelAttribute => (this.data[activeModelAttribute] as ActiveModel)._save(req, dataInterface))

    if ('updatedAt' in this.modelSchema) this.data['updatedAt'] = utils.dateHelpers.getCurrentDateTimeString()

    dataInterface(req, this.tableName, this.data.id, this.attributes())
  }

  protected beforeSave?(): void

  save = (req: Request, call: string = ''): boolean => {
    if (this.validate(call)) {
      this.beforeSave && this.beforeSave()

      this._save(req, setActiveRow)

      return true
    } else {
      return false
    }
  }

  protected beforeCreate?(): void

  create = (req: Request): boolean => {
    this.beforeCreate && this.beforeCreate()

    if (this.validate('new')) {
      this.beforeSave && this.beforeSave()

      this._save(req, addActiveRow)

      return true
    } else {
      return false
    }
  }
}

export default ActiveModel