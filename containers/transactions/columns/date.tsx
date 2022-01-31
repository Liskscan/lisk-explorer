import { TransactionDataType } from "@moosty/lisk-service-provider"
import { TableQueryColsProp } from "@Types"
import { formatTime } from "utils/format"

export const date: TableQueryColsProp = {
  value: "Date",
  format: (tx: TransactionDataType) => (
    <div className={"text-onSurfaceMedium font-medium whitespace-nowrap"}>
      {formatTime(tx?.block?.timestamp)}
    </div>
  ),
}
