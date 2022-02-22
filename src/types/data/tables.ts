export type DefaultRow = {
  id: string
}

export type TableRow = DefaultRow & {
  [key: string]: any
}

export type Tables = {
  [key: string]: Array<TableRow>
}
