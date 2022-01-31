import { FC, useEffect, useState } from "react"
import { Table } from "components/data/table/Table"
import {
  Envelope,
  ForgersDataType,
  SingleDataType,
  useLiskService,
} from "@moosty/lisk-service-provider"
import { DelegateAccountData, TableCols, TableColsProp } from "@Types"
import { DelegateStatusTypes } from "@moosty/lisk-connection-provider/dist/types"
import { LoadMore } from "components/ui/LoadMore"
import { parseLiskScanData } from "containers/delegates/utils"

export interface TableDelegateColsProp {
  style?: object
  align?: "left" | "center" | "right"
  bg?: string
  text?: string
  bold?: string
  className?: string
  width?: string
  value?: any | string

  format(row: SingleDataType | DelegateAccountData, foreign?: any): any | string
}

interface DelegateFilterParams {
  status?: DelegateStatusTypes[]
}

interface DelegateTableProps {
  delegatesSSR?: DelegateAccountData[]
  forgersSSR?: ForgersDataType[]
  cols: TableDelegateColsProp[]
  className?: string
  oddClassName?: string
  evenClassName?: string
  hoverClassName?: string
  headClassName?: string
  button?: {
    label: string
    onClick: any
  }

  customSort?(a: TableColsProp, b: TableColsProp): number

  filter?: DelegateFilterParams
}

export const DelegateTable: FC<DelegateTableProps> = ({
  delegatesSSR,
  forgersSSR,
  cols,
  oddClassName,
  evenClassName,
  hoverClassName,
  headClassName,
  className,
  customSort,
  filter,
}) => {
  const pageSize = 100
  const { serviceClient } = useLiskService()
  // const { delegates } = useServiceDelegates()
  const [delegates, setDelegates] = useState<DelegateAccountData[]>(
    delegatesSSR || [],
  )
  const [forgers, setForgers] = useState<ForgersDataType[]>(forgersSSR || [])
  const [rows, setRows] = useState<Array<TableColsProp>>()
  const [limit, setLimit] = useState<number>(0)
  const [page, setPage] = useState(1)
  useEffect(() => {
    const getForgers = async () => {
      const forgers = (await serviceClient?.get("get.forgers", {
        limit: 103,
      })) as Envelope
      if (forgers?.data) {
        setForgers(forgers.data as ForgersDataType[])
      }
    }
    if (serviceClient) {
      getForgers()
    }
  }, [serviceClient])

  useEffect(() => {
    const getDelegates = async () => {
      const result = (await serviceClient?.get("get.accounts", {
        isDelegate: true,
        // offset: 100,
        limit: pageSize,
        status: filter?.status?.join(",") || "active",
      })) as { data: DelegateAccountData[]; meta: { total: number } }
      if (result?.meta?.total) {
        setLimit(result.meta.total)
      }
      if (result?.data) {
        setDelegates(
          result.data.map(parseLiskScanData) as DelegateAccountData[],
        )
        setPage(2)
      }
    }
    if (serviceClient) {
      getDelegates()
    }
  }, [serviceClient, filter])

  useEffect(() => {
    const getDelegates = async () => {
      const result = (await serviceClient?.get("get.accounts", {
        isDelegate: true,
        offset: page * pageSize - pageSize,
        limit: pageSize,
        status: filter?.status?.join(",") || "active",
      })) as { data: DelegateAccountData[]; meta: { total: number } }
      if (result?.data) {
        setDelegates((delegates) => [
          ...delegates!,
          ...(result.data.map(parseLiskScanData) as DelegateAccountData[]),
        ])
      }
    }
    if (serviceClient && page > 1) {
      getDelegates()
    }
  }, [serviceClient, page])

  useEffect(() => {
    if (delegates) {
      let unsortedRows: TableColsProp[] = delegates.map((line, i) => {
        return {
          id: line.summary.address,
          data: line,
          cols: cols.map(
            (col) =>
              ({
                ...col,
                value: col.format(line, forgers),
              } as TableCols),
          ),
        } as TableColsProp
      })
      if (customSort) {
        const sortedRows = unsortedRows.sort(customSort)
        setRows(sortedRows)
      } else {
        setRows(unsortedRows)
      }
    }
  }, [delegates, customSort, delegatesSSR])

  return (
    <div>
      {rows && (
        <Table
          key={filter?.status?.join("-")}
          stickyHeader={true}
          className={className}
          rows={rows.slice(0, page * pageSize)}
          cols={cols}
          oddClassName={oddClassName}
          evenClassName={evenClassName}
          hoverClassName={hoverClassName}
          headClassName={headClassName}
        />
      )}

      {rows && page < Math.ceil(limit / pageSize) && (
        <LoadMore
          onEnter={() => {
            setPage(page + 1)
          }}
        />
      )}
    </div>
  )
}
