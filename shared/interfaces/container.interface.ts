import { TableColsProp, TableQueryColsProp } from "./table.interface"
import { Envelope, GetMethods, Param } from "@moosty/lisk-connection-provider"
import { AccountDataType } from "@moosty/lisk-service-provider"

export interface BlocksProps {
  staticTable?: boolean
  ssr?: any[]
  cols: Array<TableQueryColsProp>
  limit?: number
  offset?: number
  params?: Param
  foreign?: any

  customSort?(a: TableColsProp, b: TableColsProp): number

  className?: string
  oddClassName?: string
  evenClassName?: string
  hoverClassName?: string
  headClassName?: string
  button?: {
    label: string
    onClick(): any
  }
  method?: GetMethods
  stickyHeader?: boolean
  emptyTable?: string
  rowId?: string
  refresh?: boolean
  iterator?: string
}

export interface DelegateAccountData extends AccountDataType {
  liskScan: {
    selfVote: string
    maxVoteWeight: string
    missingSelfVote: string
    neededSelfVote: string
    capacity: string
    voteWeight: string
    overWeight: string
    rank: number | any
    nextForgingTime: number
  }
}

export interface DelegateEnvelope extends Omit<Envelope, "data"> {
  data?: DelegateAccountData[]
}
