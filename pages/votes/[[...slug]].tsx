import { FC } from "react"
import {
  AccountDataType,
  TransactionDataType,
} from "@moosty/lisk-service-provider"
import { Pagination } from "components/ui"
import { useRouter } from "next/router"
import { NetworkStatusDataType } from "@moosty/lisk-connection-provider"
import { Meta } from "components/data/Meta"
import { localRpc } from "utils"
import { VotingWidget } from "containers/votes/Voting"

export const Votes: FC<{
  statusSSR: NetworkStatusDataType
  voteLimit: number
  votesSSR: TransactionDataType[]
  delegatesSSR: AccountDataType[]
}> = ({ statusSSR, voteLimit, votesSSR, delegatesSSR }) => {
  const router = useRouter()
  const [page] = router.query.slug || ["0"]
  return (
    <>
      <Meta title={"Lisk Votes"} />
      <div className="">
        <VotingWidget
          fallback={votesSSR}
          foreign={{ status: statusSSR, delegates: delegatesSSR }}
          limit={parseInt(process.env.NEXT_PUBLIC_PAGES_VOTES_LIMIT!)}
          className="w-full md:w-app max-w-app mx-auto"
          oddClassName="bg-surface text-onSurfaceMedium"
          evenClassName="bg-surface text-onSurfaceMedium"
          offset={
            parseInt(page || "0") *
            parseInt(process.env.NEXT_PUBLIC_PAGES_VOTES_LIMIT!)
          }
        />
        <Pagination
          href={"/votes/[[...slug]]"}
          siblingCount={3}
          page={parseInt(page || "0")}
          items={voteLimit}
          location={"/votes"}
        />
      </div>
    </>
  )
}

export const getServerSideProps = async (context: any) => {
  const [page] = context.params.slug || ["0"]
  const voteLimit = parseInt(process.env.NEXT_PUBLIC_PAGES_VOTES_LIMIT!)
    ? parseInt(process.env.NEXT_PUBLIC_PAGES_VOTES_LIMIT!) <= 100
      ? parseInt(process.env.NEXT_PUBLIC_PAGES_VOTES_LIMIT!)
      : 100
    : 10
  const results = await localRpc.request([
    {
      method: "get.network.status",
      params: {},
    },
    {
      method: "get.transactions",
      params: {
        moduleAssetId: "5:1",
        limit: voteLimit,
        offset: parseInt(page || "0") * voteLimit,
      },
    },
  ])
  if (results) {
    const delegates: any = {}
    for (let i = 0; i < results?.[1]?.result?.data?.length; i++) {
      const votes = results?.[1]?.result?.data?.[i]?.asset?.votes as {
        delegateAddress: string
      }[]
      const delegateAddresses = votes?.map((v) => v?.delegateAddress)
      for (let j = 0; j < delegateAddresses?.length; j++) {
        if (!delegates[delegateAddresses[j]]) {
          const res = await localRpc.request([
            {
              method: "get.accounts",
              params: {
                limit: 1,
                address: delegateAddresses[j],
              },
            },
          ])
          delegates[delegateAddresses[j]] = res?.[0]?.result?.data?.[0]
        }
      }
    }
    const votes = results?.[1]?.result?.data?.map((v: TransactionDataType) => ({
      ...v,
      asset: {
        ...v.asset,
        votes: v.asset.votes.map((vv: any) => {
          return {
            ...vv,
            username: delegates[vv.delegateAddress]?.summary?.username,
          }
        }),
      },
    }))
    return {
      props: {
        votesSSR: votes,
        voteLimit: Math.ceil(
          (results?.[1]?.result?.meta?.total || 0) / voteLimit,
        ),
        statusSSR: results?.[0]?.result?.data,
        delegatesSSR: delegates,
      },
    }
  }
}

export default Votes
