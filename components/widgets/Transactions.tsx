import { FC } from "react"
import { useServiceEvents } from "@moosty/lisk-service-events"
import { DataWidget } from "@Types"
import { transactionColumns } from "containers"
import { DataTable } from "components"

export const Transactions: FC<DataWidget> = ({
  foreign,
  fallback,
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
}) => {
  const { status } = useServiceEvents()
  const cols: any[] = [
    {
      ...transactionColumns.status,
      format: transactionColumns.status.format.bind({
        status: { ...foreign, ...status },
      }),
    },
    transactionColumns.id,
    transactionColumns.date,
    transactionColumns.transaction,
  ]
  if (filter?.moduleAssetId !== "5:0") {
    cols.push(transactionColumns.sender)
  }
  if (filter?.moduleAssetId === "2:0" || !filter?.moduleAssetId) {
    cols.push(transactionColumns.recipient)
    cols.push(transactionColumns.data)
  }
  if (
    filter?.moduleAssetId === "2:0" ||
    !filter?.moduleAssetId ||
    filter?.moduleAssetId === "1000:0"
  ) {
    cols.push({
      ...transactionColumns.amount,
      format: transactionColumns.amount.format.bind(filter),
    })
  }
  if (filter?.moduleAssetId === "5:3") {
    cols.push(transactionColumns.pomDelegate)
  }
  if (filter?.moduleAssetId === "4:0") {
    cols.push(transactionColumns.signatures)
    cols.push(transactionColumns.mandatory)
  }
  if (filter?.moduleAssetId === "5:0") {
    cols.push(transactionColumns.senderAddress)
    cols.push(transactionColumns.registerName)
  }
  if (filter?.moduleAssetId === "5:1") {
    cols.push(transactionColumns.voteCount)
    cols.push(transactionColumns.voteAmount)
  }
  if (filter?.moduleAssetId === "5:2") {
    cols.push(transactionColumns.unlock)
  }
  cols.push(transactionColumns.fee)

  return (
    <DataTable
      rowId={"id"}
      ssr={fallback}
      foreign={{ status: { ...foreign, ...status }, filter }}
      emptyTable={"No transactions found"}
      stickyHeader={stickyHeader}
      className={className}
      oddClassName={oddClassName}
      evenClassName={evenClassName}
      hoverClassName={hoverClassName}
      headClassName={headClassName}
      customSort={customSort}
      params={{ limit, offset, ...filter }}
      button={button}
      method={"get.transactions"}
      limit={limit}
      cols={cols}
    />
  )
}
