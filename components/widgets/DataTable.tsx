import { FC } from "react"
import { QueryTable } from "components/data/table"
import { BlocksProps } from "@Types"

export const DataTable: FC<BlocksProps> = ({
  staticTable,
  ssr,
  cols,
  limit = 10,
  offset = 0,
  params = {},
  method = "get.blocks",
  customSort,
  oddClassName,
  evenClassName,
  hoverClassName,
  headClassName,
  className,
  stickyHeader,
  button,
  emptyTable,
  rowId,
  refresh,
  iterator,
  foreign,
}) => (
  <QueryTable
    staticTable={staticTable}
    foreign={foreign}
    ssr={ssr}
    iterator={iterator}
    stickyHeader={stickyHeader}
    cols={cols}
    className={className}
    oddClassName={oddClassName}
    evenClassName={evenClassName}
    hoverClassName={hoverClassName}
    headClassName={headClassName}
    customSort={customSort}
    method={method}
    params={{ limit, offset, ...params }}
    button={button}
    emptyTable={emptyTable}
    rowId={rowId}
    refresh={refresh}
  />
)
