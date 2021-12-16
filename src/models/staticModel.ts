import Model from './model'
import { ActiveModelData, Condition, StaticModelInterface } from '../types/models/model'
import { getStaticRow, getStaticTable } from '../data/staticDataInterface'

abstract class StaticModel extends Model implements StaticModelInterface {
  protected static _find = getStaticRow

  protected static _all = (tableName: string): Array<ActiveModelData> => {
    return getStaticTable(tableName)
  }

  protected static _where = (tableName: string, conditions: Array<Condition>): Array<ActiveModelData> => {
    return getStaticTable(tableName, conditions)
  }

  static count = (tableName: string, conditions: Array<Condition>): number => {
    return this._where(tableName, conditions).length
  }
}

export default StaticModel