export type DefaultRow = {
  id: number
}

export type TableRow = DefaultRow & {
  [key: string]: any
}

export type Tables = {
  [key: string]: Array<TableRow>
}
