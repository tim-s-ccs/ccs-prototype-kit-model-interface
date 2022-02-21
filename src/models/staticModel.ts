import Model from './model'
import { Condition, ModelData, StaticModelInterface } from '../types/models/model'
import { getStaticRow, getStaticTable } from '../data/staticDataInterface'

abstract class StaticModel extends Model implements StaticModelInterface {
  protected static _find = (tableName: string, primaryKey: string, primaryKeyValue: string): ModelData => {
    return getStaticRow(tableName, primaryKey, primaryKeyValue)
  }

  protected static _all = (tableName: string): Array<ModelData> => {
    return getStaticTable(tableName)
  }

  protected static _where = (tableName: string, conditions: Array<Condition>): Array<ModelData> => {
    return getStaticTable(tableName, conditions)
  }

  static count = (tableName: string, conditions: Array<Condition>): number => {
    return this._where(tableName, conditions).length
  }
}

export default StaticModel