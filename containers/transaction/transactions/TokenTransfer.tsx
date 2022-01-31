import { FC } from "react"
import { KeyValueRow, Paper } from "components/ui"
import { TransactionDataType } from "@moosty/lisk-service-provider"
import copy from "copy-to-clipboard"
import { useRouter } from "next/router"
import { CopyHotKey } from "../../modals"

export const TokenTransfer: FC<{ transaction: TransactionDataType }> = ({
  transaction,
}) => {
  const router = useRouter()
  return (
    <div className="flex flex-col md:flex-row w-full mx-auto md:space-x-4 justify-center mb-1 md:mb-4">
      <CopyHotKey
        message={"Copied recipient address"}
        hotkey={"c+r"}
        action={() =>
          transaction && copy(`${transaction.asset.recipient.address}`)
        }
        deps={[transaction]}
      />
      <CopyHotKey
        message={""}
        hotkey={"g+r"}
        action={() =>
          transaction &&
          router.push(`/account/${transaction.asset.recipient.address}`)
        }
        deps={[transaction]}
      />
      <Paper
        className="text-onSurfaceMedium flex-wrap md:flex-nowrap justify-around md:justify-between w-full p-2 md:p-5 "
        surface={1}
        shadow={0}
      >
        <div className="flex flex-wrap md:flex-nowrap flex-row justify-start md:justify-around md:justify-between w-full ">
          <div className="md:flex md:flex-col md:flex-grow justify-between rounded md:p-5 ">
            <div className="md:inline-flex">
              <KeyValueRow
                label={"Data"}
                value={
                  transaction?.asset?.data
                    ? transaction?.asset?.data
                    : "no data"
                }
                classNameValue={"text-2xl"}
                className={"md:text-center text-2xl"}
              />
            </div>
          </div>
        </div>
      </Paper>
    </div>
  )
}
