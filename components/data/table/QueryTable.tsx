import { FC, useEffect, useState } from "react"
import {
  DataListType,
  Envelope,
  useLiskService,
} from "@moosty/lisk-service-provider"
import { useServiceEvents } from "@moosty/lisk-service-events"
import { QueryTableProps, TableCols, TableColsProp } from "@Types"
import { Table } from "@Components"
import { misc } from "utils"

export const QueryTable: FC<QueryTableProps> = ({
  staticTable,
  foreign,
  ssr,
  cols,
  oddClassName,
  evenClassName,
  hoverClassName,
  headClassName,
  className,
  method,
  params,
  customSort,
  refresh = false,
  stickyHeader,
  button,
  emptyTable,
  rowId,
  iterator,
}) => {
  const { serviceClient } = useLiskService()
  const { pulse } = useServiceEvents()
  const [result, setResult] = useState<DataListType>(ssr || [])
  const [rows, setRows] = useState<Array<TableColsProp>>(
    Array(params?.limit || 1),
  )
  const [update, setUpdate] = useState<number>(0)
  const [lastRequest, setLastRequest] = useState<{
    time: number
    params?: string
  }>({ time: 0 })
  useEffect(() => setResult(ssr as DataListType), [ssr])
  useEffect(() => {
    const getData = async (method: any, params: any) => {
      if (!staticTable || !result || result.length === 0) {
        const { data } = (await serviceClient?.getMore(
          method,
          params,
        )) as Envelope

        if (data) {
          if (!iterator) {
            setResult(data as DataListType)
          } else {
            // @ts-ignore
            setResult(data[iterator] as DataListType)
          }
        }
      }
    }
    const now = new Date().getTime() - 100
    const reqId = JSON.stringify({ method, params })
    if (
      serviceClient &&
      method &&
      (now > lastRequest?.time || lastRequest?.params !== reqId)
    ) {

      setLastRequest({ time: new Date().getTime(), params: reqId })
      iterator && setResult([] as DataListType)
      getData(method, params)
    }
  }, [
    serviceClient,
    method,
    params,
    update,
    lastRequest,
    iterator,
    staticTable,
  ])

  useEffect(() => {
    if (refresh) {
      setUpdate(pulse)
    }
  }, [pulse, refresh])

  useEffect(() => {
    if (result && result[0]) {
      // @ts-ignore
      const unsortedRows: TableColsProp[] = result.map((line, i) => {
        let id = `${i}-row`
        const foundKey = rowId && misc.selectKey(rowId, line)
        if (foundKey) {
          id = foundKey
        }
        return {
          ...line,
          id,
          cols: cols.map(
            (col) =>
              ({ ...col, value: col.format(line, foreign, i) } as TableCols),
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
  }, [result, customSort, cols, rowId])

  return (
    <div>
      {rows && (
        <Table
          key={`${method}-${Object.keys(params)
            // @ts-ignore
            .map((k) => `${k}-${params[k]}`)
            .join("-")}`}
          stickyHeader={stickyHeader}
          className={className}
          rows={rows}
          cols={cols}
          oddClassName={oddClassName}
          evenClassName={evenClassName}
          hoverClassName={hoverClassName}
          headClassName={headClassName}
          button={button}
          emptyTable={emptyTable}
        />
      )}
    </div>
  )
}
