import { TransactionDataType } from "@moosty/lisk-service-provider"
import { TableQueryColsProp } from "@Types"

export const voteCount: TableQueryColsProp = {
  value: "Votes",
  align: "center",
  format: (tx: TransactionDataType) => (
    <span className="text-onSurfaceMedium">{tx.asset?.votes?.length}</span>
  ),
}
