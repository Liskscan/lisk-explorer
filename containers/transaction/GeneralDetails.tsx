import {FC, useState} from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { TransactionDataType } from "@moosty/lisk-service-provider"
import { IconButton, KeyValueRow, Link, Paper } from "components/ui"
import { DuplicateIcon } from "@heroicons/react/solid"
import { compactString, formatTime } from "utils/format"
import {Snackbar} from "components/ui/Snackbar";

export const GeneralDetails: FC<{ transaction: TransactionDataType }> = ({
  transaction,
}) => {
  const [copyNoteToggle, setCopyNoteToggle] = useState<boolean>(false)
  const [copyNoteText, setCopyNoteText] = useState<string>("")
  const copyNotification = (text: string) => {
    setCopyNoteToggle(true)
    setCopyNoteText(text)
    setTimeout(() => setCopyNoteToggle(false), 5000)
  }

  return (
    <div className="flex flex-col md:flex-row w-full mx-auto md:space-x-4 justify-center mb-1 md:mb-4">
      <Paper
        className="text-onSurfaceMedium z-20 flex-wrap md:flex-nowrap justify-around md:justify-between w-full  p-2 md:p-4 "
        surface={1}
        shadow={0}
      >
        <h1 className="text-xl font-bold mb-2 ">Transaction information</h1>
        <div className="flex py-1 md:py-0 z-20 flex-wrap md:flex-nowrap flex-col md:flex-row justify-around md:justify-between w-full">
          <div className=" flex flex-col flex-grow rounded md:p-4 ">
            <div className=" inline-flex">
              <KeyValueRow
                label="Transaction ID"
                value={transaction?.id}
                className={"md:text-center whitespace-nowrap "}
                compactOnMobile
                icon={
                  <CopyToClipboard text={transaction?.id.toString() || ""}>
                    <IconButton onClick={copyNotification.bind(this, "Transaction ID copied")} className="focus:text-accentPrimary text-surfacePrimaryDark">
                      <DuplicateIcon
                        className={[
                          "h-4 w-4 hover:text-onSurfacePrimaryLow",
                          "focus:text-accentPrimary text-surfacePrimaryDark text-xs",
                        ].join(" ")}
                      />
                    </IconButton>
                  </CopyToClipboard>
                }
              />
            </div>

            <div className="inline-flex">
              <KeyValueRow
                label="Sender"
                className={"md:text-center"}
                value={
                  <>
                    <Link
                      href={`/account/[[...slug]]`}
                      color="secondary"
                      link={`/account/${transaction?.sender?.address}`}
                      className="hidden md:block cursor-pointer hover:underline"
                    >
                      {transaction?.sender?.username ||
                        transaction?.sender?.address}
                    </Link>
                    <Link
                      href={`/account/[[...slug]]`}
                      color="secondary"
                      link={`/account/${transaction?.sender?.address}`}
                      className="md:hidden cursor-pointer hover:underline"
                    >
                      {transaction?.sender?.username ||
                        compactString(transaction?.sender?.address, 35)}
                    </Link>
                  </>
                }
                icon={
                  <CopyToClipboard
                    text={
                      transaction?.sender?.username ||
                      transaction?.sender?.address ||
                      ""
                    }
                  >
                    <IconButton onClick={copyNotification.bind(this, "Sender address copied")} className="focus:text-accentPrimary text-surfacePrimaryDark m-0 p-0">
                      <DuplicateIcon
                        className={[
                          "h-4 w-4 hover:text-onSurfacePrimaryLow",
                          "focus:text-accentPrimary text-surfacePrimaryDark text-xs",
                        ].join(" ")}
                      />
                    </IconButton>
                  </CopyToClipboard>
                }
              />
            </div>
            <div>
              <KeyValueRow
                label="Sender Publickey"
                className={"md:text-center"}
                compactOnMobile
                value={transaction?.sender?.publicKey}
                icon={
                  <CopyToClipboard text={transaction?.sender?.publicKey || ""}>
                    <IconButton onClick={copyNotification.bind(this, "Sender public key copied")} className="focus:text-accentPrimary text-surfacePrimaryDark">
                      <DuplicateIcon
                        className={[
                          "h-4 w-4 hover:text-onSurfacePrimaryLow",
                          "focus:text-accentPrimary text-surfacePrimaryDark text-xs",
                        ].join(" ")}
                      />
                    </IconButton>
                  </CopyToClipboard>
                }
              />
            </div>

            {transaction?.asset?.recipient?.address && (
              <div>
                <KeyValueRow
                  label="Recipient address"
                  value={
                    <>
                      <Link
                        href={`/account/[[...slug]]`}
                        color="secondary"
                        link={`/account/${transaction?.asset?.recipient?.address}`}
                        className="hidden md:block cursor-pointer hover:underline"
                      >
                        {transaction?.asset?.recipient?.address}
                      </Link>
                      <Link
                        href={`/account/[[...slug]]`}
                        color="secondary"
                        link={`/account/${transaction?.asset?.recipient?.address}`}
                        className="md:hidden cursor-pointer hover:underline"
                      >
                        {compactString(
                          transaction?.asset?.recipient?.address,
                          35,
                        )}
                      </Link>
                    </>
                  }
                  className={"md:text-center"}
                  icon={
                    <CopyToClipboard
                      text={transaction?.asset?.recipient?.address || ""}
                    >
                      <IconButton onClick={copyNotification.bind(this, "Recipient address copied")} className=" focus:text-accentPrimary text-surfacePrimaryDark ">
                        <DuplicateIcon
                          className={[
                            "h-4 w-4 hover:text-onSurfacePrimaryLow m-0 p-0",
                            "focus:text-accentPrimary text-surfacePrimaryDark",
                          ].join(" ")}
                        />
                      </IconButton>
                    </CopyToClipboard>
                  }
                />
              </div>
            )}
            {transaction?.moduleAssetId === "2:0" && (
              <div>
                <KeyValueRow
                  label="Recipient Publickey"
                  compactOnMobile
                  value={
                    transaction?.asset?.recipient?.publicKey
                      ? transaction?.asset?.recipient?.publicKey
                      : "-"
                  }
                  className={"md:text-center"}
                />
              </div>
            )}
          </div>
          <div className="flex flex-col flex-grow  rounded mt-4 md:mt-0 md:p-5 ">
            <KeyValueRow
              label="Status"
              value={transaction?.isPending ? "Pending" : "Confirmed"}
              className={"md:text-center"}
            />
            <KeyValueRow
              label="Height"
              value={transaction?.block?.height}
              className={"md:text-center "}
            />
            <KeyValueRow
              label="Timestamp"
              value={
                transaction &&
                formatTime(transaction?.block?.timestamp, false, false)
              }
              className={"md:text-center"}
            />
            <KeyValueRow
              label="Block ID"
              value={
                compactString(transaction?.block?.id, 35) && (
                  <Link
                    href={`/block/[blockId]`}
                    color="secondary"
                    link={`/block/${transaction?.block?.id}`}
                    className="text-secondary cursor-pointer hover:underline "
                  >
                    {compactString(transaction?.block?.id, 20)}
                  </Link>
                )
              }
              className={"md:text-center"}
            />
          </div>
        </div>
        {copyNoteToggle && <Snackbar message={copyNoteText} toggleState={setCopyNoteToggle}/>}
      </Paper>
    </div>
  )
}
