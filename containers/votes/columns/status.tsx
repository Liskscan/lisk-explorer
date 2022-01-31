import { TransactionDataType } from "@moosty/lisk-service-provider"
import {
  CheckCircleIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/outline"
import { NetworkStatusDataType } from "@moosty/lisk-connection-provider"

export const status = {
  value: "Status",
  format: (tx: TransactionDataType, status: NetworkStatusDataType) => (
    <div>
      {!status?.finalizedHeight ? (
        <QuestionMarkCircleIcon className="w-5 h-5 text-onSurfacePrimaryHigh mx-auto" />
      ) : status?.finalizedHeight < tx?.height ? (
        <ClockIcon className="w-5 h-5 text-info mx-auto" />
      ) : (
        <CheckCircleIcon className="w-5 h-5 text-success mx-auto" />
      )}{" "}
    </div>
  ),
}
