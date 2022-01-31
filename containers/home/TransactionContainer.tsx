import { FC } from "react"
import { useRouter } from "next/router"
import { TransactionDataType } from "@moosty/lisk-service-provider"
import { NetworkStatusDataType } from "@moosty/lisk-connection-provider"
import { DataTable } from "components"
import { transactionColumns } from "containers"

export const TransactionContainer: FC<{
  transactions: TransactionDataType[]
  status: NetworkStatusDataType
}> = ({ transactions, status }) => {
  const router = useRouter()
  return (
    <div className="w-full md:w-2/4">
      <div className="mx-auto md:mr-2">
        <DataTable
          foreign={status as any}
          oddClassName="bg-background hover:bg-surface"
          evenClassName="bg-background hover:bg-surface"
          ssr={transactions}
          rowId={"id"}
          method={"get.transactions"}
          button={{
            label: "Explore more transactions".toUpperCase(),
            onClick: () => router.push("/transactions"),
          }}
          cols={[
            {
              ...transactionColumns.idDate,
              format: transactionColumns.idDate.format.bind(status),
            },
            transactionColumns.senderTransaction,
            transactionColumns.data,
            transactionColumns.amountFee,
          ]}
        />
      </div>
    </div>
  )
}
