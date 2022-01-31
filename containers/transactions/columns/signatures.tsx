import { TransactionDataType } from "@moosty/lisk-service-provider"
import { TableQueryColsProp } from "@Types"

export const signatures: TableQueryColsProp = {
  value: "Signatures",
  align: "center",
  format: (tx: TransactionDataType) => (
    <span className="text-onSurfaceHigh">{tx.asset?.numberOfSignatures}</span>
  ),
}
