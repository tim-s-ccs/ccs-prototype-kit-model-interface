// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Session } from 'express-session'
import { Tables } from '../types/data/tables'

declare module 'express-session' {
  interface Session {
    data: {
      tables: Tables
      [key: string]: any
    }
  }
}
