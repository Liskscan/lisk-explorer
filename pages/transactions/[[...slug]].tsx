import { FC } from "react"
import { TransactionDataType } from "@moosty/lisk-service-provider"
import { NetworkStatusDataType } from "@moosty/lisk-connection-provider"
import { useRouter } from "next/router"
import { Meta } from "components/data/Meta"
import { formatNormalCase } from "../../utils/format"
import { TransactionsTableContainer } from "../../containers/transactions/TransactionsTableContainer"
import { localRpc } from "../../utils"

export const Transactions: FC<{
  fallback: { data: TransactionDataType[] }
  itemCount: number
  status: NetworkStatusDataType
}> = ({ fallback, itemCount, status }) => {
  const router = useRouter()
  const [filter] = router.query.slug || []
  const filterName =
    filter && filter !== "all"
      ? status?.moduleAssets.find((ma) => filter === ma.id)?.name
      : "All Lisk transactions"

  return (
    <>
      <Meta
        title={
          filterName
            ? `${filterName
                .split(":")
                .map((str) => formatNormalCase(str))
                .map((str) =>
                  str
                    .split(" ")
                    .map(
                      (strSplit) =>
                        `${strSplit.charAt(0).toUpperCase()}${strSplit.slice(
                          1,
                        )}`,
                    )
                    .join(" "),
                )
                .join(" ")} Transactions`
            : `All Lisk Transactions`
        }
      />

      <div className="flex flex-col space-y-4">
        <TransactionsTableContainer
          limit={parseInt(process.env.NEXT_PUBLIC_PAGES_TRANSACTIONS_LIMIT!)}
          fallback={fallback.data}
          itemCount={itemCount}
          status={status}
        />
      </div>
    </>
  )
}

export const getServerSideProps = async (context: any) => {
  const [filter, page] = context.params.slug || ["all", "0"]
  const params =
    filter === "all"
      ? {
          limit: parseInt(process.env.NEXT_PUBLIC_PAGES_TRANSACTIONS_LIMIT!),
          offset:
            parseInt(process.env.NEXT_PUBLIC_PAGES_TRANSACTIONS_LIMIT!) *
            parseInt(page || 0),
        }
      : {
          moduleAssetId: filter,
          limit: parseInt(process.env.NEXT_PUBLIC_PAGES_TRANSACTIONS_LIMIT!),
          offset:
            parseInt(process.env.NEXT_PUBLIC_PAGES_TRANSACTIONS_LIMIT!) *
            parseInt(page || 0),
        }
  const results = await localRpc.request([
    {
      method: "get.network.status",
      params: {},
    },
    {
      method: "get.transactions",
      params,
    },
  ])
  if (results) {
    return {
      props: {
        fallback: {
          data: results?.[1]?.result?.data || null,
        },
        status: results?.[0]?.result?.data || null,
        itemCount: Math.ceil(
          (results?.[1]?.result?.meta?.total || 0) /
            parseInt(process.env.NEXT_PUBLIC_PAGES_TRANSACTIONS_LIMIT!),
        ),
      },
    }
  }
  return {
    notFound: true,
  }
}

export default Transactions
