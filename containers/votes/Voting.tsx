import { FC } from "react"
import { DataWidget } from "@Types"
import { voteColumns } from "./columns"
import { useServiceEvents } from "@moosty/lisk-service-events"
import { transactionColumns } from "../transactions"
import { DataTable } from "@Components"

export const VotingWidget: FC<DataWidget> = ({
  foreign,
  limit = 10,
  offset = 0,
  filter = {},
  customSort,
  oddClassName,
  evenClassName,
  hoverClassName,
  headClassName,
  className,
  stickyHeader,
  button,
  fallback,
}) => {
  const { status } = useServiceEvents()
  const cols: any[] = [
    {
      ...transactionColumns.status,
      format: transactionColumns.status.format.bind(status || foreign.status),
    },
    voteColumns.id,
    voteColumns.date,
    voteColumns.sender,
    transactionColumns.votes,
  ]
  return (
    <DataTable
      rowId={"id"}
      ssr={fallback}
      foreign={{ ...foreign, status, filter }}
      emptyTable={"No votes found"}
      stickyHeader={stickyHeader}
      className={className}
      oddClassName={oddClassName}
      evenClassName={evenClassName}
      hoverClassName={hoverClassName}
      headClassName={headClassName}
      customSort={customSort}
      params={{ moduleAssetId: "5:1", limit, offset, ...filter }}
      button={button}
      method={"get.transactions"}
      limit={limit}
      cols={cols}
    />
  )
}
