import { ActiveModel, ModelSchema, ValidationSchema } from '../../../src'
import { ModelData } from '../../../src/types/models/model'

class MockActiveModel extends ActiveModel {
  static tableName: string = 'mockActiveModel'

  tableName: string = 'mockActiveModel'
  modelSchema: ModelSchema
  validationSchema: ValidationSchema

  constructor(data: ModelData, modelSchema: ModelSchema, validationSchema: ValidationSchema) {
    super({
      id: data.id,
      name: data.name,
      code: data.code
    })

    this.modelSchema = modelSchema
    this.validationSchema = validationSchema
  }
}

export default MockActiveModel