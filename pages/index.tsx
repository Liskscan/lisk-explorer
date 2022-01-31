import { FC } from "react"
import {
  BlockDataType,
  TransactionDataType,
} from "@moosty/lisk-service-provider"
import { NetworkStatusDataType } from "@moosty/lisk-connection-provider"
import { Meta } from "components"
import { BlockContainer, TransactionContainer } from "containers"
import { localRpc } from "utils"

export const Home: FC<{
  transactions: TransactionDataType[]
  blocks: BlockDataType[]
  status: NetworkStatusDataType
}> = ({ transactions, blocks, status }) => (
  <>
    <Meta />
    <div className="w-full z-10 flex flex-col md:flex-row md:w-app max-w-app center mx-auto">
      <TransactionContainer transactions={transactions} status={status} />
      <BlockContainer blocks={blocks} />
    </div>
  </>
)

export const getServerSideProps = async (context: any) => {
  const results = await localRpc.request([
    {
      method: "get.network.status",
      params: {},
    },
    {
      method: "get.transactions",
      params: { limit: 10 },
    },
    {
      method: "get.blocks",
      params: { limit: 10 },
    },
  ])
  return {
    props: {
      status: results?.[0]?.result?.data || null,
      transactions: results?.[1]?.result?.data || null,
      blocks: results?.[2]?.result?.data || null,
    },
  }
}

export default Home
