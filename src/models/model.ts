import { ModelData, ModelInterface } from '../@types/models/model'

abstract class Model implements ModelInterface {
  data: ModelData

  constructor(data: ModelData) {
    this.data = data
  }
}

export default Model