import { GetMethods, Param } from "@moosty/lisk-connection-provider"
import { SingleDataType } from "@moosty/lisk-service-provider"
import { SingleVoteReceived } from "./service.interface"

export interface TableCols {
  style?: object
  align?: "left" | "center" | "right"
  value?: string | any
  bg?: string
  text?: string
  weight?: string
}

export interface TableHeadCols {
  style?: object
  align?: "left" | "center" | "right"
  value?: string | any
  bg?: string
  text?: string
  bold?: string
  className?: string
}

export interface QueryTableProps {
  staticTable?: boolean
  ssr?: any[]
  foreign?: any
  cols: Array<TableQueryColsProp>
  className?: string
  oddClassName?: string
  evenClassName?: string
  hoverClassName?: string
  headClassName?: string
  button?: {
    label: string
    onClick: any
  }
  method: GetMethods
  params: Param
  rowId?: string

  customSort?(a: TableColsProp, b: TableColsProp): number

  refresh?: boolean
  stickyHeader?: boolean
  emptyTable?: string
  iterator?: string
}

export interface TableColsProp {
  id: string
  cols: TableColProp[]
  data?: any
}

export interface TableColProp {
  style?: object
  align?: "left" | "center" | "right"
  value?: string | any
  bg?: string
  text?: string
  bold?: string
  width?: string
}

export interface TableProps {
  rows: Array<TableColsProp>
  cols: Array<TableHeadColsProp>
  className?: string
  oddClassName?: string
  evenClassName?: string
  hoverClassName?: string
  headClassName?: string
  button?: {
    label: string
    onClick: any
  }
  stickyHeader?: boolean
  emptyTable?: string
}

export interface TableQueryColsProp {
  style?: object
  align?: "left" | "center" | "right"
  bg?: string
  text?: string
  bold?: string
  className?: string
  width?: string
  value?: any | string

  format(
    row: SingleDataType | SingleVoteReceived | any,
    n?: number | any,
    arg?: any,
  ): any | string
}

export interface TableHeadColsProp {
  style?: object
  align?: "left" | "center" | "right"
  value?: string | any
  bg?: string
  text?: string
  bold?: string
  className?: string
  width?: string
}
