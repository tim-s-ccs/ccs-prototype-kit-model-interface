import Model from '../model'
import { Condition, ModelData, StaticModelInterface } from '../../@types/models/model'
import { getStaticRow, getStaticTable } from '../../data/staticDataInterface'

abstract class StaticModel extends Model implements StaticModelInterface {
  static _find = (tableName: string, id: number): ModelData => {
    return getStaticRow(tableName, id)
  }

  static _all = (tableName: string): Array<ModelData> => {
    return getStaticTable(tableName)
  }

  static _where = (tableName: string, conditions: Array<Condition>): Array<ModelData> => {
    return getStaticTable(tableName, conditions)
  }
}

export default StaticModel