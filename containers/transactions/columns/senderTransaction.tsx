import { TransactionDataType } from "@moosty/lisk-service-provider"
import { Link } from "components/ui"
import { compactString } from "utils/format"
import { TableQueryColsProp } from "@Types"

export const senderTransaction: TableQueryColsProp = {
  format: (transaction: TransactionDataType) => {
    return (
      <div>
        <div className={"flex flex-row whitespace-nowrap"}>
          <span className={"text-onSurfaceLow mr-1"}>From:</span>
          <Link
            href={`/account/[[...slug]]`}
            color={"onSurfaceLinkHigh"}
            className={"cursor-pointer"}
            link={`/account/${transaction.sender.address}`}
          >
            {transaction.sender.username ||
              compactString(transaction.sender.address, 24)}
          </Link>
        </div>
        <div className={"flex flex-row whitespace-nowrap"}>
          {transaction.moduleAssetId === "2:0" && (
            <span className={"text-onSurfaceLow mr-1"}>To:</span>
          )}
          <Link
            color={"onSurfaceLinkHigh"}
            href={
              transaction.moduleAssetId === "2:0"
                ? `/account/[[...slug]]`
                : `/transaction/[transactionId]`
            }
            link={
              transaction.moduleAssetId === "2:0"
                ? `/account/${transaction.asset.recipient.address}`
                : `/transaction/${transaction.id}`
            }
            className={`${
              transaction.moduleAssetId === "2:0"
                ? "cursor-pointer"
                : "text-onSurfaceMedium"
            }`}
          >
            {transaction.moduleAssetId === "2:0" ? (
              transaction.asset?.recipient?.username ? (
                transaction.asset?.recipient?.username
              ) : (
                compactString(transaction.asset?.recipient?.address, 24)
              )
            ) : (
              <div className={"flex flex-row font-medium "}>
                <div className={"flex flex-row"}>
                  <span className={" text-onSurfaceMedium"}>
                    {transaction.moduleAssetName.split(":")[0]}
                  </span>
                </div>
                <span className=" px-1 text-onSurfacePrimaryMedium">|</span>
                <div className={"flex flex-row"}>
                  <span className={"text-onSurfaceMedium"}>
                    {transaction.moduleAssetName.split(":")[1]}
                  </span>
                </div>
              </div>
            )}
          </Link>
        </div>
      </div>
    )
  },
}
