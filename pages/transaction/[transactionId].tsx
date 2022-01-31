import { FC } from "react"
import { TransactionDataType } from "@moosty/lisk-service-provider"

import copy from "copy-to-clipboard"
import { useRouter } from "next/router"
import { NetworkStatusDataType } from "@moosty/lisk-connection-provider"
import { Meta } from "components/data/Meta"
import { localRpc } from "utils"
import { compactString } from "utils/format"
import { CopyHotKey } from "containers"
import { Transactions } from "@Components"
import { DposVotes, TokenTransfer } from "containers/transaction/transactions"
import {
  Asset,
  GeneralDetails,
  TransactionDetails,
  Type,
} from "containers/transaction"

export const Transaction: FC<{
  transaction: TransactionDataType
  statusSSR: NetworkStatusDataType
}> = ({ transaction, statusSSR }) => {
  const router = useRouter()
  const { transactionId } = router.query as { transactionId: string }

  return (
    <>
      <Meta
        title={`Transaction ${transaction?.moduleAssetName
          ?.split(":")
          .join(" ")} ${compactString(transaction?.id, 16)}`}
      />
      <div className="w-full md:w-app max-w-app mx-auto px-1 md:px-0">
        <CopyHotKey
          message={"Link copied"}
          hotkey={"c+l"}
          action={() =>
            transactionId &&
            copy(
              `${window.location.protocol}//${window.location.host}/transaction/${transactionId}`,
            )
          }
          deps={[transactionId]}
        />
        <CopyHotKey
          message={"Copied sender address"}
          hotkey={"c+s"}
          action={() => transaction && copy(`${transaction.sender.address}`)}
          deps={[transaction]}
        />
        <CopyHotKey
          message={""}
          hotkey={"g+s"}
          action={() =>
            transaction && router.push(`/account/${transaction.sender.address}`)
          }
          deps={[transaction]}
        />
        {transaction?.moduleAssetId !== "5:1" && (
          <Transactions
            fallback={[transaction]}
            foreign={statusSSR}
            limit={1}
            filter={{ transactionId, moduleAssetId: transaction.moduleAssetId }}
          />
        )}
        {transaction?.moduleAssetId === "5:1" && (
          <DposVotes
            foreign={{ status: statusSSR }}
            transaction={transaction}
          />
        )}
        {transaction && <GeneralDetails transaction={transaction} />}
        {transaction?.moduleAssetId === "2:0" && (
          <TokenTransfer transaction={transaction} />
        )}
        {transaction && (
          <div className={"flex flex-col md:flex-row md:space-x-4"}>
            <Type transaction={transaction} />
            <TransactionDetails transaction={transaction} />
          </div>
        )}
        {transaction?.moduleAssetId !== "5:1" && transaction?.asset && (
          <Asset transaction={transaction} />
        )}
      </div>
    </>
  )
}

export const getStaticProps = async (context: any) => {
  const { transactionId } = context.params
  const results = await localRpc.request([
    {
      method: "get.network.status",
      params: {},
    },
    {
      method: "get.transactions",
      params: {
        limit: 1,
        transactionId,
      },
    },
  ])
  if (results) {
    return {
      props: {
        transaction: results?.[1]?.result?.data?.[0],
        statusSSR: results?.[0]?.result?.data,
      },
      revalidate:
        results?.[1]?.result?.data?.[0]?.height <
        (results?.[0]?.result?.data?.finalizedHeight || 0)
          ? false
          : 10,
    }
  }
  return {
    notFound: true,
  }
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  }
}

export default Transaction
