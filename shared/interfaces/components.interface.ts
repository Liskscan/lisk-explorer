import { NetworkStatusDataType, Param } from "@moosty/lisk-connection-provider"
import { TableColsProp } from "./table.interface"
import { QuickResult } from "./data.interface"
import { MarketPriceDataType } from "@moosty/lisk-service-provider"

export interface KPIProps {
  icon: JSX.Element
  label: string
  value?: number | string | any
  tooltip?: string
}

export interface CurrencyProviderProps {
  decimals: number
  price: MarketPriceDataType[]

  parseBeddows(
    beddows: string,
    convert?: boolean,
    overRideDecimals?: number,
  ): {
    number: string
    decimals?: string
    lsk: string
  }

  formatNumber(number?: string): string
}

export interface CurrencyProps {
  beddows: string
  sign?: boolean
  symbol?: boolean
  convert?: boolean
  forceDecimals?: number
  classes?: {
    sign?: string
    symbol?: string
    number?: string
    separator?: string
    decimals?: string
  }
}

export interface KPIPropsChainInfo extends KPIProps {
  kpi: string
  format?: (
    value: any,
    status: NetworkStatusDataType,
  ) => string | number | JSX.Element
}

export interface IncomingVotesProps {
  address?: any
  amount?: string
  username?: string | any
  start?: string
  end?: string
  height?: number
  color?: boolean
  requestUsername?: boolean
}

export interface QueryLinkProps {
  link: string
  color?: string
  className?: string
  activeClassName?: string
  href: {
    pathname: string
    query: any
  }
  onClick?: () => void
}

export interface LinkProps {
  link: string
  color?: string
  className?: string
  activeClassName?: string
  href: string
  onClick?: () => void
}

export interface PaperProps {
  className?: string
  rounded?: boolean
  shadow?: 0 | 1 | 2 | 3 | 4
  surface: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
}

export interface TooltipProps {
  label: string
  positionBottom?: boolean
  className?: string
  positionTop?: boolean
}

export interface SearchResults {
  results: any[]
  quickResult: QuickResult
}

export interface DataWidget {
  foreign?: any
  fallback?: any[]
  limit?: number
  offset?: number
  filter?: Param

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
  stickyHeader?: boolean
  iterator?: string
}
