import cast from '../utils/cast'
import CustomValidator from '../validation/validators/customValidator'
import InputValidator from '../validation/validators/inputValidator'
import Model from './model'
import StaticModel from './staticModel'
import StaticModelValidator from '../validation/validators/staticModelValidator'
import Validator from '../validation/validator'
import { ActiveModelInterface, Condition, DataInterfaceFunction, ModelData, ModelError, ModelSchema } from '../types/models/model'
import { addActiveRow, getActiveRow, getActiveTable, setActiveRow } from '../data/activeDataInterface'
import { Request } from 'express'
import { TableRow } from '../types/data/tables'
import { ValidationSchema, ValidationScheme } from '../types/validation/validationSchema'

abstract class ActiveModel extends Model implements ActiveModelInterface {
  abstract tableName: string
  abstract modelSchema: ModelSchema
  abstract validationSchema: ValidationSchema

  errors: {[key: string]: ModelError} = {}

  constructor(data: ModelData) {
    super(data)
  }

  // TODO: Possilby static init model

  protected static _find = getActiveRow

  protected static _all = (req: Request, tableName: string): Array<ModelData> => {
    return getActiveTable(req, tableName)
  }

  protected static _where = (req: Request, tableName: string, conditions: Array<Condition>): Array<ModelData> => {
    return getActiveTable(req, tableName, conditions)
  }

  protected static nextID = (req: Request, tableName: string): number => {
    return Math.max(...this._all(req, tableName).map(modelData => modelData.id)) + 1
  }

  validate = (call: string) => {
    this.errors = {}

    if (this.validationSchema.inputValidations !== undefined){
      this.validationSchema.inputValidations.forEach(inputValidation => {
        // TODO: Chnage to somthing that is not any
        const attributeValidation: InputValidator = new (inputValidation.validator as any)(this.data[inputValidation.attribute], inputValidation.options)

        this.validateAttribute(call, inputValidation, attributeValidation)
      })
    }

    if (this.validationSchema.customValidations !== undefined) {
      this.validationSchema.customValidations.forEach(customValidation => {
        // TODO: Chnage to somthing that is not any
        const attributeValidation: CustomValidator = new (customValidation.validator as any)(this, customValidation.options)

        this.validateAttribute(call, customValidation, attributeValidation)
      })
    }

    if (this.validationSchema.staticModelValidations !== undefined) {
      this.validationSchema.staticModelValidations.forEach(staticModelValidation => {
        const attributeValidation: StaticModelValidator = new StaticModelValidator(this.data[staticModelValidation.attribute], staticModelValidation.options)

        this.validateAttribute(call, staticModelValidation, attributeValidation)
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

  private validateAttribute = (call: string, validation: ValidationScheme, attributeValidation: Validator) => {
    if (!attributeValidation.valid(call)) {
      this.errors[validation.attribute] = {
        error: attributeValidation.error,
        errorMessage: validation.errorMessages[attributeValidation.error]
      }
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
      if(this.modelSchema[attribute].prototype instanceof Model) {
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

  assignAttributes = (data: ModelData): void  => {
    for (const attribute in this.modelSchema) {
      if (attribute in data) {
        const attributeConstructor = this.modelSchema[attribute]

        if (attributeConstructor.prototype instanceof ActiveModel) {
          (this.data[attribute] as ActiveModel).assignAttributes(data[attribute])
        } else if (attributeConstructor.prototype instanceof StaticModel) {
          const id = cast(data[attribute], Number)

          if (this.data[attribute] === undefined || (this.data[attribute] as StaticModel).data.id !== id) {
            // TODO: Chnage to somthing that is not any
            this.data[attribute] = (attributeConstructor as any).find(id)
          }
        } else {
          this.data[attribute] = cast(data[attribute], attributeConstructor as NumberConstructor|StringConstructor|BooleanConstructor)
        }
      }
    }
  }

  private _save = (req: Request, dataInterface: DataInterfaceFunction): void => {
    const activeModelAttributes: Array<string> = Object.keys(this.data).filter((attribute) => this.data[attribute] instanceof ActiveModel)

    activeModelAttributes.forEach(activeModelAttribute => (this.data[activeModelAttribute] as ActiveModel)._save(req, dataInterface))

    dataInterface(req, this.tableName, this.data.id, this.attributes())
  }

  save = (req: Request): void => {
    this._save(req, setActiveRow)
  }

  create = (req: Request): boolean => {
    if (this.validate('new')) {
      this._save(req, addActiveRow)

      return true
    } else {
      return false
    }
  }
}

export default ActiveModel