import Model from './model'
import RowNotFoundError from '../errors/rowNotFoundError'
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
  req: Request
  data: ActiveModelData = this.data

  abstract tableName: string
  abstract modelSchema: ModelSchema
  abstract validationSchema: ValidationSchema

  errors: ActiveModelErrors = {}

  constructor(req: Request, data: ActiveModelData, modelSchema: ModelSchema) {
    super(ActiveModel.initData(req, data, modelSchema))
    this.req = req
  }

  // TODO: Change references to any
  private static initData = (req: Request, data: ActiveModelData, modelSchema: ModelSchema): ActiveModelData => {
    return Object.fromEntries(Object.keys(modelSchema).map((attribute) => {
      const attributeConstructor = modelSchema[attribute]

      if(attributeConstructor.constructor.prototype instanceof ActiveModel) {
        const attributeValue: number|undefined = data[`${attribute}ID`]

        if (attributeValue !== undefined) {
          return [attribute, (attributeConstructor.constructor as any).find(req, attributeValue)]
        } else {
          return [attribute, undefined]
        }
      } else if (attributeConstructor.constructor.prototype instanceof StaticModel) {
        const attributeValue: number|undefined = data[`${attribute}ID`]

        if (attributeValue !== undefined) {
          return [attribute, (attributeConstructor.constructor as any).find(attributeValue)]
        } else {
          return [attribute, undefined]
        }
      } else if (attributeConstructor.constructor === Array) {
        if ((attributeConstructor as ArrayAttributeConstructor).arrayItemConstuctor.prototype instanceof ActiveModel) {
          const attributeValue: number[]|undefined = data[`${attribute.slice(0, -1)}IDs`]

          if (attributeValue !== undefined) {
            return [attribute, attributeValue.map(activeModelID => ((attributeConstructor as ArrayAttributeConstructor).arrayItemConstuctor as any).find(req, activeModelID))]
          } else {
            return [attribute, []]
          }
        } else if ((attributeConstructor as ArrayAttributeConstructor).arrayItemConstuctor.prototype instanceof StaticModel) {
          const attributeValue: number[]|undefined = data[`${attribute.slice(0, -1)}IDs`]

          if (attributeValue !== undefined) {
            return [attribute, attributeValue.map(staticModelID => ((attributeConstructor as ArrayAttributeConstructor).arrayItemConstuctor as any).find(staticModelID))]
          } else {
            return [attribute, []]
          }
        } else {
          if (data[attribute] !== undefined) {
            return [attribute, data[attribute]]
          } else {
            return [attribute, []]
          }
        }
      } else {
        return [attribute, data[attribute]]
      }
    })) as ActiveModelData
  }

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

  protected static generateID = (): string => {
    return utils.addLeadingZeros(Math.floor(Math.random() * 100000), 6)
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
      } else if (
        (this.modelSchema[attribute] as ArrayAttributeConstructor).constructor === Array &&
        (this.modelSchema[attribute] as ArrayAttributeConstructor).arrayItemConstuctor.prototype instanceof Model
      ) {
        let attributeValue: number[]

        if (this.data[attribute] === undefined) {
          attributeValue = []
        } else {
          attributeValue = (this.data[attribute] as Model[]).map(model => model.data.id)
        }
        return [`${attribute.slice(0, -1)}IDs`, attributeValue]
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

        if (attributeConstructor.constructor === Array) {
          const arrayItemConstuctor = (attributeConstructor as ArrayAttributeConstructor).arrayItemConstuctor

          if (data[attribute] === undefined) {
            this.data[attribute] = []
          } else {
            if (arrayItemConstuctor.prototype instanceof ActiveModel) {
              const activeModels: {[id: string]: ActiveModelData} = (data[attribute] as ActiveModelData[]).reduce((models: {[id: string]: ActiveModelData}, activeModelData: ActiveModelData) => {
                models[activeModelData.id] = activeModelData
                return models
              }, {})

              this.data[attribute].forEach((activeModel: ActiveModel) => {
                activeModel.assignAttributes(activeModels[activeModel.data.id])
              })
            } else if (arrayItemConstuctor.prototype instanceof StaticModel) {
              // TODO: Chnage to somthing that is not any
              this.data[attribute] = data[attribute].map((primaryKeyValue: string) => (arrayItemConstuctor as any).find(primaryKeyValue))
            } else if (arrayItemConstuctor === Date) {
              this.data[attribute] = data[attribute].map((date: number[]) => {
                return `${utils.addLeadingZeros(date[2], 4)}-${utils.addLeadingZeros(date[1], 2)}-${utils.addLeadingZeros(date[0], 2)}`
              })
            } else {
              this.data[attribute] = data[attribute].map((element: string) => utils.cast(element, arrayItemConstuctor as PrimitiveConstructors))
            }
          }
        } else if (attributeConstructor.constructor.prototype instanceof ActiveModel) {
          (this.data[attribute] as ActiveModel).assignAttributes(data[attribute])
        } else if (attributeConstructor.constructor.prototype instanceof StaticModel) {
          const primaryKeyValue = utils.cast(data[attribute], String)

          if (this.data[attribute] === undefined || (this.data[attribute] as StaticModel).data.id !== primaryKeyValue) {
            // TODO: Chnage to somthing that is not any
            this.data[attribute] = (attributeConstructor.constructor as any).find(primaryKeyValue)
          }
        } else if (attributeConstructor.constructor === Date) {
          this.data[attribute] = `${utils.addLeadingZeros(data[attribute][2] as number, 4)}-${utils.addLeadingZeros(data[attribute][1] as number, 2)}-${utils.addLeadingZeros(data[attribute][0] as number, 2)}`
        } else {
          this.data[attribute] = utils.cast(data[attribute], attributeConstructor.constructor as PrimitiveConstructors)
        }
      }
    }
  }

  private _save = (dataInterface: DataInterfaceFunction|undefined = undefined): void => {
    Object.keys(this.modelSchema).forEach((attribute) => {
      const attributeConstructor = this.modelSchema[attribute]

      if (attributeConstructor.constructor === Array && (attributeConstructor as ArrayAttributeConstructor).arrayItemConstuctor.prototype instanceof ActiveModel) {
        this.data[attribute].forEach((activeModel: ActiveModel) => activeModel._save())
      } else if (attributeConstructor.constructor.prototype instanceof ActiveModel) {
        (this.data[attribute] as ActiveModel)._save()
      }
    })

    if ('updatedAt' in this.modelSchema) this.data['updatedAt'] = utils.dateHelpers.getCurrentDateTimeString()

    if (dataInterface === undefined) {
      try {
        ActiveModel._find(this.req, this.tableName, this.data.id)
        dataInterface = setActiveRow
      } catch(error) {
        if (error instanceof RowNotFoundError) {
          dataInterface = addActiveRow
        } else {
          throw error
        }
      }
    }

    dataInterface(this.req, this.tableName, this.data.id, this.attributes())
  }

  protected beforeSave?(): void

  save = (call: string = ''): boolean => {
    if (this.validate(call)) {
      this.beforeSave && this.beforeSave()

      this._save(setActiveRow)

      return true
    } else {
      return false
    }
  }

  protected beforeCreate?(): void

  create = (): boolean => {
    this.beforeCreate && this.beforeCreate()

    if (this.validate('new')) {
      this.beforeSave && this.beforeSave()

      this._save(addActiveRow)

      return true
    } else {
      return false
    }
  }
}

export default ActiveModel