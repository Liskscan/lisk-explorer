import { FC } from "react"
import { TransactionDataType } from "@moosty/lisk-service-provider"
import { useServiceEvents } from "@moosty/lisk-service-events"
import { transactionColumns } from "containers/transactions"
import { NetworkStatusDataType } from "@moosty/lisk-connection-provider"
import { DataTable } from "@Components"

export const DposVotes: FC<{
  foreign: { status: NetworkStatusDataType }
  transaction: TransactionDataType
}> = ({ transaction, foreign }) => {
  const { status } = useServiceEvents()
  const cols: any[] = [
    {
      ...transactionColumns.status,
      format: transactionColumns.status.format.bind(status),
    },
    transactionColumns.id,
    transactionColumns.date,
    transactionColumns.transaction,
  ]

  cols.push(transactionColumns.voteCount)
  cols.push(transactionColumns.voteAmount)
  cols.push(transactionColumns.votes)

  cols.push(transactionColumns.fee)
  return (
    <DataTable
      ssr={[transaction]}
      foreign={{ ...foreign, ...status }}
      emptyTable={"Loading votes.."}
      params={{ transactionId: transaction.id }}
      method={"get.transactions"}
      limit={1}
      cols={cols}
    />
  )
}
