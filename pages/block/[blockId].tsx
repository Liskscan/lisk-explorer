import React, { FC } from "react"
import {IconButton, Link, Paper} from "components/ui"
import { KeyValueRow } from "components/ui/KeyValueRow"
import {
  BlockDataType,
  Param,
  TransactionDataType,
} from "@moosty/lisk-service-provider"
import { Currency } from "components/ui/Currency"
import { useRouter } from "next/router"
import { NetworkStatusDataType } from "@moosty/lisk-connection-provider"
import { Meta } from "components/data/Meta"
import { compactString, formatTime } from "utils/format"
import { Transactions } from "@Components"
import { localRpc } from "utils"
import {useNotification} from "hooks/Notification";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {DuplicateIcon} from "@heroicons/react/solid";
import {Snackbar} from "components/ui/Snackbar";

export const Block: FC<{
  block: BlockDataType
  blockTransactions: TransactionDataType[]
  status: NetworkStatusDataType
}> = ({ block, blockTransactions, status }) => {
  const router = useRouter()
  const { blockId } = router.query as { blockId: string }
  const [copyNoteText, setCopyNoteText] = useNotification("", 5000)

  return (
    <>
      <Meta
        title={`Block -${block?.id ? compactString(block?.id, 20) : " "}`}
      />
      <div className="w-full px-1">
        <Paper
          className="flex z-20 md:w-app md:max-w-app mx-auto text-onSurfaceMedium flex-wrap md:flex-nowrap flex-row justify-around md:justify-between w-full md:p-5 "
          surface={1}
          shadow={0}
        >
          <div className="flex z-20 flex-wrap md:flex-nowrap flex-row justify-around md:justify-between w-full">
            <div className="flex flex-col flex-grow justify-between rounded p-2 md:p-5 md:w-1/2">
              <h1 className="md:hidden text-xl font-bold mb-2 ">
                Block Information
              </h1>
              <KeyValueRow
                label="Block ID"
                value={block?.id}
                compactOnMobile
                className={"md:text-center whitespace-nowrap "}
                icon={
                  <CopyToClipboard
                    text={block?.id || ""}>
                    <IconButton onClick={() => setCopyNoteText( "Block ID copied")} className=" focus:text-accentPrimary text-surfacePrimaryDark ">
                      <DuplicateIcon className="h-4 w-4 hover:text-onSurfacePrimaryMedium focus:text-accentPrimary text-surfacePrimaryDark text-xs" />
                    </IconButton>
                  </CopyToClipboard>
                }
              />
              <KeyValueRow
                label="Number of transactions"
                value={block?.numberOfTransactions}
                className={"md:text-center"}
              />
              <KeyValueRow
                label="Is final"
                value={block?.isFinal ? "true" : "false"}
                className={"md:text-center"}
              />
              <KeyValueRow
                label="Reward"
                value={<Currency beddows={block?.reward || "0"} />}
                className={"md:text-center"}
              />
              <KeyValueRow
                label="Total Fee"
                value={<Currency beddows={block?.totalFee || "0"} />}
                className={"md:text-center"}
              />
              <KeyValueRow
                label="Total Burned"
                value={<Currency beddows={block?.totalBurnt || "0"} />}
                className={"md:text-center"}
              />
              <KeyValueRow
                label="Total Forged"
                value={<Currency beddows={block?.totalForged || "0"} />}
                className={"md:text-center"}
              />
            </div>
          </div>

          <div className="flex flex-col flex-grow justify-between  rounded p-2 md:p-5 md:w-1/2 ">
            <KeyValueRow
              label="Height"
              value={block?.height}
              className={"md:text-center"}
            />
            <KeyValueRow
              label="Max Height Previously Forged"
              value={block?.maxHeightPreviouslyForged}
              className={"md:text-center"}
            />
            <KeyValueRow
              label="Max Height Prevoted"
              value={block?.maxHeightPrevoted}
              className={"md:text-center"}
            />
            <KeyValueRow
              label="Timestamp"
              value={block && formatTime(block?.timestamp, false, false)}
              className={"md:text-right"}
            />
            <KeyValueRow
              label="Previous block"
              value={
                block?.previousBlockId && (
                  <Link
                    link={`/block/${block?.previousBlockId}`}
                    href={`/block/[blockId]`}
                    className="text-secondary cursor-pointer hover:underline "
                  >
                    {compactString(block?.previousBlockId, 20)}
                  </Link>
                )
              }
              className={"md:text-center"}
            />
            <KeyValueRow
              label="Seed Reveal"
              value={block?.seedReveal}
              className={""}
              icon={
                <CopyToClipboard
                  text={block?.seedReveal || ""}>
                  <IconButton onClick={() => setCopyNoteText( "Seed copied")} className=" focus:text-accentPrimary text-surfacePrimaryDark ">
                    <DuplicateIcon className="h-4 w-4 hover:text-onSurfacePrimaryMedium focus:text-accentPrimary text-surfacePrimaryDark text-xs" />
                  </IconButton>
                </CopyToClipboard>
              }
            />
            <KeyValueRow
              label="Generated by"
              value={
                block?.generatorUsername && (
                  <Link
                    link={`/account/${block?.generatorAddress}`}
                    href={`/account/[[...slug]]`}
                    className="text-secondary cursor-pointer hover:underline "
                  >
                    {compactString(block?.generatorUsername, 20)}
                  </Link>
                )
              }
              className={"md:text-center"}
            />
          </div>
          {(copyNoteText != "") && <Snackbar message={copyNoteText} toggleState={setCopyNoteText}/>}
        </Paper>
        {blockTransactions && (
          <div className="mx-auto w-full md:w-app max-w-app">
            <Transactions
              limit={200}
              filter={{ blockId }}
              fallback={blockTransactions}
              foreign={status}
            />
          </div>
        )}
      </div>
    </>
  )
}

export const getStaticProps = async (context: any) => {
  const { blockId } = context.params
  const params =
    parseInt(blockId).toString() === blockId
      ? { height: blockId }
      : { blockId: blockId }
  const results = await localRpc.request([
    {
      method: "get.network.status",
      params: {},
    },
    {
      method: "get.blocks",
      params: { limit: 1, ...(params as Param) },
    },
    {
      method: "get.transactions",
      params,
    },
  ])
  if (results) {
    return {
      props: {
        block: results[1]?.result?.data?.[0] || null,
        blockTransactions: results[2]?.result?.data || null,
        status: results[0]?.result?.data || null,
      },
      revalidate:
        results[1]?.data?.[0].height < (results[0]?.data?.finalizedHeight || 0)
          ? false
          : 360,
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

export default Block
