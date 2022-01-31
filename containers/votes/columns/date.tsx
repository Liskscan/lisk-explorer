import { TransactionDataType } from "@moosty/lisk-service-provider"
import { Tooltip } from "components/ui"
import { formatTime } from "utils/format"

export const date = {
  value: "Date",
  format: (tx: TransactionDataType) => (
    <Tooltip label={formatTime(tx?.block?.timestamp, false, false)}>
      <div className={"whitespace-nowrap"}>
        {formatTime(tx?.block?.timestamp)}
      </div>
    </Tooltip>
  ),
}
