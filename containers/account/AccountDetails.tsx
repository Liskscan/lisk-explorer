import { FC, useEffect, useState, useRef } from "react"
import { IconButton, KeyValueRow, Paper } from "components/ui"
import {
  ArrowDownIcon,
  ArrowSmUpIcon,
  DuplicateIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/solid"
import {
  AccountDataType,
  BlockDataType,
  Envelope,
  useLiskService,
} from "@moosty/lisk-service-provider"
import { CopyToClipboard } from "react-copy-to-clipboard"
import copy from "copy-to-clipboard"
import { useAddressConverter } from "hooks/AddressConverter"
import { clean } from "../../utils/misc"
import { CopyHotKey } from "../modals"
import { compactString } from "../../utils/format"
import { getAddressFromLisk32Address } from "../../utils/lisk"
import { Snackbar } from "components/ui/Snackbar";

export const AccountDetails: FC<{
  account: AccountDataType
  received?: number | null
  send?: number | null
  lastBlockSSR?: BlockDataType | null
}> = ({ account, send, received, lastBlockSSR }) => {
  const timeoutRef = useRef<NodeJS.Timeout>()
  const { serviceClient } = useLiskService()
  const [transactionsCount, setTransactionsCount] =
    useState<{ in: number; out: number }>()
  const [lastBlock, setLastBlock] = useState<BlockDataType>(
    lastBlockSSR || ({} as BlockDataType),
  )
  const { setInput, legacy } = useAddressConverter()

  useEffect(() => {
    if (serviceClient && account) {
      const getTransactionsInAndOut = async () => {
        const transactionsIn = (await serviceClient.get(
          "get.transactions",
          clean({
            recipientPublicKey: account?.summary?.publicKey,
            recipientAddress: account?.summary?.address,
            limit: 1,
          }),
        )) as Envelope
        const transactionsOut = (await serviceClient.get(
          "get.transactions",
          clean({
            senderPublicKey: account?.summary?.publicKey,
            senderAddress: account?.summary?.address,
            limit: 1,
          }),
        )) as Envelope
        setTransactionsCount({
          in: transactionsIn?.meta?.total || 0,
          out: transactionsOut?.meta?.total || 0,
        })
        if (account?.summary?.address) {
          setInput(account?.summary?.address)
        }
        if (account?.summary?.isDelegate) {
          const lastBlock = (await serviceClient.get("get.blocks", {
            generatorPublicKey: account?.summary?.publicKey || "",
            limit: 1,
          })) as { data?: BlockDataType[] }
          if (lastBlock?.data?.[0]) {
            setLastBlock(lastBlock.data[0])
          }
        }
      }
      getTransactionsInAndOut()
    }
  }, [serviceClient, account])

  const [copyNoteText, setCopyNoteText] = useState<string>("")
  useEffect(() => {
      timeoutRef.current && clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setCopyNoteText(""), 5000)
    }
  ,[copyNoteText])

  return (
    <Paper
      className="md:grid md:mx-auto md:grid-cols-2 md:grid-flow-row md:gap-x-10  max-w-app flex-grow text-onSurfaceHigh p-2 md:p-5 w-full"
      surface={1}
    >
      <CopyHotKey
        message={"Username copied"}
        hotkey={"c+u"}
        action={() =>
          account?.summary?.username && copy(account?.summary?.username)
        }
        deps={[account]}
      />
      <CopyHotKey
        message={"Address copied"}
        hotkey={"c+a"}
        action={() =>
          account?.summary?.address && copy(account?.summary?.address)
        }
        deps={[account]}
      />
      <CopyHotKey
        message={"Public key copied"}
        hotkey={"c+p"}
        action={() =>
          account?.summary?.publicKey && copy(account?.summary?.publicKey)
        }
        deps={[account]}
      />
      {account?.summary?.username && (
        <KeyValueRow
          label="Owner"
          value={
            <span className=" text-onSurfaceLight  ">
              {account?.summary?.username || account?.summary?.address}
            </span>
          }
          className={" whitespace-nowrap "}
          icon={
            <CopyToClipboard
              text={account?.summary?.username || account?.summary?.address}
            >
              <IconButton onClick={() => setCopyNoteText("Username copied")} className=" focus:text-accentPrimary text-surfacePrimaryDark ">
                <DuplicateIcon className="h-4 w-4 hover:text-onSurfacePrimaryMedium focus:text-accentPrimary text-surfacePrimaryDark text-xs" />
              </IconButton>
            </CopyToClipboard>
          }
        />
      )}
      {account?.summary?.address && (
        <KeyValueRow
          label="Address"
          value={
            <div>
              <span className="hidden md:block">
                {account?.summary?.address}
              </span>
              <span className="text-onSurfaceLight md:hidden block">
                {compactString(account?.summary?.address, 30 || "")}
              </span>
            </div>
          }
          className={" whitespace-nowrap "}
          icon={
            <CopyToClipboard
              text={account?.summary?.address || ""}>
              <IconButton onClick={() => setCopyNoteText( "Address copied")} className=" focus:text-accentPrimary text-surfacePrimaryDark ">
                <DuplicateIcon className="h-4 w-4 hover:text-onSurfacePrimaryMedium focus:text-accentPrimary text-surfacePrimaryDark text-xs" />
              </IconButton>
            </CopyToClipboard>
          }
        />
      )}
      <KeyValueRow
        label="PublicKey"
        value={compactString(account?.summary?.publicKey, 25) || "unknown"}
        icon={
          account?.summary?.publicKey ? (
            <CopyToClipboard text={account?.summary?.publicKey || ""}>
              <IconButton onClick={() => setCopyNoteText( "Public key copied")} className=" focus:text-accentPrimary text-surfacePrimaryDark ">
                <DuplicateIcon className="h-4 w-4 hover:text-onSurfacePrimaryMedium focus:text-accentPrimary text-surfacePrimaryDark text-xs" />
              </IconButton>
            </CopyToClipboard>
          ) : (
            <div />
          )
        }
      />
      <KeyValueRow
        label="Hex Address (Binary Address)"
        value={
          <div>
            <span className="hidden md:block">
              {account?.summary?.address &&
                Buffer.from(
                  getAddressFromLisk32Address(account?.summary?.address, "lsk"),
                ).toString("hex")}
            </span>
            <span className="block md:hidden">
              {account?.summary?.address &&
                compactString(
                  Buffer.from(
                    getAddressFromLisk32Address(
                      account?.summary?.address,
                      "lsk",
                    ),
                  ).toString("hex"),
                  30,
                )}
            </span>
          </div>
        }
        className={" whitespace-nowrap "}
        icon={
          <CopyToClipboard
            text={
              account?.summary?.address &&
              Buffer.from(
                getAddressFromLisk32Address(account?.summary?.address, "lsk"),
              ).toString("hex")
            }
          >
            <IconButton onClick={() => setCopyNoteText( "Hex address copied")} className=" focus:text-accentPrimary text-surfacePrimaryDark ">
              <DuplicateIcon className="h-4 w-4 hover:text-onSurfacePrimaryMedium focus:text-accentPrimary text-surfacePrimaryDark text-xs" />
            </IconButton>
          </CopyToClipboard>
        }
      />
      {account?.summary?.isDelegate && (
        <KeyValueRow
          label="Status"
          value={
            account?.dpos?.delegate?.status
              ? account?.dpos?.delegate?.status
              : "no status"
          }
        />
      )}
      {legacy && (
        <KeyValueRow
          label="Legacy Address"
          value={
            <a
              href={`https://legacy-explorer.lisk.com/address/${legacy}`}
              target={"_blank"}
              rel={"noopener nofollow"}
            >
              {legacy}
            </a>
          }
          className={"text-center whitespace-nowrap "}
          icon={
            <CopyToClipboard text={legacy}>
              <IconButton onClick={() => setCopyNoteText( "Legacy address copied")} className=" focus:text-accentPrimary text-surfacePrimaryDark ">
                <DuplicateIcon className="h-4 w-4 hover:text-onSurfacePrimaryMedium focus:text-accentPrimary text-surfacePrimaryDark text-xs" />
              </IconButton>
            </CopyToClipboard>
          }
        />
      )}

      {account?.summary?.isDelegate && (
        <KeyValueRow
          label="is Banned"
          value={
            account?.dpos?.delegate?.isBanned ? (
              <div className="flex flex-row-reverse">
                <ExclamationCircleIcon className="w-5 h-5 text-error" />
                <span>Banned</span>
              </div>
            ) : (
              "false"
            )
          }
        />
      )}

      <KeyValueRow
        label="Transactions"
        value={
          <div className={"flex flex-row"}>
            <ArrowSmUpIcon className="text-error h-5 w-5 float-left" />
            <span>{transactionsCount?.out || send}</span>
            <ArrowDownIcon className="text-success h-5 w-5 float-left" />
            <span>{transactionsCount?.in || received}</span>
          </div>
        }
      />
      <KeyValueRow label="Nonce:" value={account?.sequence?.nonce} />
      {account?.summary?.isDelegate && (
        <KeyValueRow
          label="Forged Blocks"
          value={account?.dpos?.delegate?.producedBlocks || "0"}
        />
      )}
      {account?.summary?.isDelegate && (
        <KeyValueRow
          label="Last Forged Height"
          value={lastBlock?.height || "0"}
        />
      )}
      {account?.summary?.isDelegate && (
        <KeyValueRow
          label="Max Height Previously Forged"
          value={lastBlock?.maxHeightPreviouslyForged || "0"}
        />
      )}
      {account?.summary?.isDelegate && (
        <KeyValueRow
          label="Max Height Prevoted"
          value={lastBlock?.maxHeightPrevoted || "0"}
        />
      )}
      {account?.summary?.isDelegate && (
        <KeyValueRow
          label="Last seed reveal"
          value={lastBlock?.seedReveal || "0"}
        />
      )}
      {(copyNoteText != "") && <Snackbar message={copyNoteText} toggleState={setCopyNoteText}/>}
    </Paper>
  )
}
