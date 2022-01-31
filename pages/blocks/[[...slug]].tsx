import React, { FC, useState } from "react"
import { BlockDataType, Param } from "@moosty/lisk-service-provider"
import { Avatar, Link, Pagination, Tooltip } from "components/ui"
import {
  CheckCircleIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/outline"
import { Currency } from "components/ui/Currency"
import { useRouter } from "next/router"
import { Meta } from "components/data/Meta"
import { NetworkStatusDataType } from "@moosty/lisk-connection-provider"
import { DataTable } from "@Components"
import { compactString, formatTime } from "utils/format"
import { localRpc } from "utils"

export const Blocks: FC<{
  blocksSSR: BlockDataType[]
  statusSSR: NetworkStatusDataType
  blockLimit: number
  filter?: Param
}> = ({ blocksSSR, statusSSR, blockLimit, filter }) => {
  const router = useRouter()
  const [page] = router.query.slug || ["0"]
  const [items, setItems] = useState<number>(blockLimit)
  const [status, setStatus] = useState<NetworkStatusDataType>(statusSSR)
  const parsedFilter = !filter ? {} : filter
  return (
    <>
      <Meta title={"Blocks"} />
      <div className="w-full md:w-app max-w-app mx-auto ">
        <DataTable
          headClassName="bg-surface-1"
          oddClassName="bg-surface"
          evenClassName="bg-surface"
          hoverClassName="hover:bg-surface-3"
          params={{ ...parsedFilter, limit: 10 }}
          ssr={blocksSSR}
          rowId={"id"}
          cols={[
            {
              value: "Status",
              format: (block: BlockDataType) => (
                <div>
                  {!status?.finalizedHeight && !statusSSR?.finalizedHeight ? (
                    <QuestionMarkCircleIcon className="w-5 h-5 text-onSurfacePrimaryMedium mx-auto" />
                  ) : status?.finalizedHeight < block?.height ||
                    statusSSR?.finalizedHeight < block?.height ? (
                    <ClockIcon className="w-5 h-5 text-onSurfacePrimaryMedium mx-auto" />
                  ) : (
                    <CheckCircleIcon className="w-5 h-5 text-success mx-auto" />
                  )}
                </div>
              ),
            },
            {
              value: "Height",
              format: (block: BlockDataType) => (
                <Link
                  href={`/block/[blockId]`}
                  color="onSurfaceLinkMedium"
                  link={`/block/${block.height}`}
                >
                  {block.height}
                </Link>
              ),
            },
            {
              value: "ID",
              format: (block: BlockDataType) => (
                <Link
                  color="onSurfaceLinkMedium"
                  href={`/block/[blockId]`}
                  link={`/block/${block.id}`}
                >
                  {compactString(block.id, 20)}
                </Link>
              ),
            },
            {
              value: "Date",
              style: { width: 180 },
              format: (block: BlockDataType) => (
                <Tooltip label={formatTime(block.timestamp, false, false)}>
                  <span className="text-onSurfaceMedium">
                    {" "}
                    {formatTime(block.timestamp)}
                  </span>
                </Tooltip>
              ),
            },
            {
              value: "Forger",
              format: (block: BlockDataType) => (
                <Link
                  href={`/account/[[...slug]]`}
                  link={`/account/${block.generatorPublicKey}`}
                >
                  <span className="flex flex-row text-onSurfacePrimaryHigh font-medium  ">
                    <Avatar
                      className="mr-2"
                      address={block?.generatorAddress}
                      size={20}
                    />
                    {block.generatorUsername}
                  </span>
                </Link>
              ),
            },
            {
              value: "Transactions",
              align: "center",
              format: (block: BlockDataType) => (
                <span className="text-onSurfaceMedium">
                  {" "}
                  {block.numberOfTransactions}
                </span>
              ),
            },
            {
              value: "Fees",
              align: "right",
              format: (block: BlockDataType) => (
                <Currency beddows={block.totalFee} />
              ),
            },
            {
              value: "Burned",
              align: "right",
              format: (block: BlockDataType) => (
                <Currency beddows={block.totalBurnt} />
              ),
            },
            {
              value: "Rewards",
              align: "right",
              format: (block: BlockDataType) => (
                <Currency beddows={block.reward} />
              ),
            },
            {
              value: "Total Forged",
              align: "right",
              format: (block: BlockDataType) => (
                <Currency beddows={block.totalForged} />
              ),
            },
          ]}
          method={"get.blocks"}
          limit={
            blockLimit || parseInt(process.env.NEXT_PUBLIC_PAGES_BLOCKS_LIMIT!)
          }
          offset={
            parseInt(page || "0") *
            parseInt(process.env.NEXT_PUBLIC_PAGES_BLOCKS_LIMIT!)
          }
        />
        {(!filter || (filter?.limit && filter.limit > 1)) && (
          <Pagination
            href={"/blocks/[[...slug]]"}
            location={"/blocks"}
            siblingCount={3}
            page={parseInt(page || "0")}
            items={items}
          />
        )}
      </div>
    </>
  )
}

export const getServerSideProps = async (context: any) => {
  const [page] = context.params.slug || ["0"]
  //	console.log(page)
  const blockLimit = parseInt(process.env.NEXT_PUBLIC_PAGES_BLOCKS_LIMIT!)
    ? parseInt(process.env.NEXT_PUBLIC_PAGES_BLOCKS_LIMIT!) <= 100
      ? parseInt(process.env.NEXT_PUBLIC_PAGES_BLOCKS_LIMIT!)
      : 100
    : 10
  //console.log(blockLimit)
  const results = await localRpc.request([
    {
      method: "get.network.status",
      params: {},
    },
    {
      method: "get.blocks",
      params: {
        limit: 10,
        offset: parseInt(page || "0") * blockLimit,
      },
    },
  ])
  if (results) {
    return {
      props: {
        blocksSSR: results?.[1]?.result?.data,
        blockLimit: Math.ceil((results?.[1]?.result?.meta?.total || 0) / 10),
        statusSSR: results?.[0]?.result?.data,
      },
    }
  }
  return {
    notFound: true,
  }
}

export default Blocks
