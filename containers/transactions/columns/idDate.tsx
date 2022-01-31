import { TransactionDataType } from "@moosty/lisk-service-provider"
import {
  CheckCircleIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/outline"
import { NetworkStatusDataType } from "@moosty/lisk-connection-provider"
import { Link, Tooltip } from "components/ui"
import { compactString, formatTime } from "utils/format"
import { TableQueryColsProp } from "@Types"

export const idDate: TableQueryColsProp = {
  value: "Transactions",
  format: (transaction: TransactionDataType, status: NetworkStatusDataType) => {
    return (
      <div className="flex flex-row items-center h-10">
        <div className="mr-4">
          {!status?.finalizedHeight ? (
            <Tooltip label={"Status unknown"}>
              <QuestionMarkCircleIcon className="w-5 h-5 text-warning mx-auto" />
            </Tooltip>
          ) : status?.finalizedHeight < transaction?.height ? (
            <Tooltip
              label={`Finalized in ~${
                transaction?.height - status.finalizedHeight
              } blocks`}
            >
              <ClockIcon className="w-5 h-5 text-info mx-auto" />
            </Tooltip>
          ) : (
            <Tooltip label={"Transaction is finalized"}>
              <CheckCircleIcon className="w-5 h-5 text-success mx-auto" />
            </Tooltip>
          )}
        </div>
        <div className="flex flex-col">
          <Link
            href={`/transaction/[transactionId]`}
            color={"onSurfaceLinkHigh"}
            className={"cursor-pointer"}
            link={`/transaction/${transaction.id}`}
          >
            {compactString(transaction.id, 16)}
          </Link>
          <Tooltip
            label={formatTime(transaction.block.timestamp, false, false)}
          >
            <div className={"text-onSurfaceMedium"}>
              {formatTime(transaction.block.timestamp)}
            </div>
          </Tooltip>
        </div>
      </div>
    )
  },
}
