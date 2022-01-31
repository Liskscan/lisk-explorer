import { TransactionDataType } from "@moosty/lisk-service-provider"
import { Tooltip } from "components/ui"
import {
  CheckCircleIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/outline"
import { NetworkStatusDataType } from "@moosty/lisk-connection-provider"
import { TableQueryColsProp } from "@Types"

export const status: TableQueryColsProp = {
  value: "Status",
  format: (
    tx: TransactionDataType,
    status: { status: NetworkStatusDataType },
  ) => {
    return (
      <div>
        {!status?.status?.finalizedHeight ? (
          <Tooltip label={"Status unknown"}>
            <QuestionMarkCircleIcon className="w-5 h-5 text-warning mx-auto" />
          </Tooltip>
        ) : status?.status?.finalizedHeight < tx?.height ? (
          <Tooltip
            label={`Finalized in ~${
              tx?.height - status.status.finalizedHeight
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
    )
  },
}
