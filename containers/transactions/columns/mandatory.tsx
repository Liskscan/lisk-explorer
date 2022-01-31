import { TransactionDataType } from "@moosty/lisk-service-provider"
import { TableQueryColsProp } from "@Types"

export const mandatory: TableQueryColsProp = {
  value: "Mandatory",
  align: "center",
  format: (tx: TransactionDataType) => (
    <span className="text-onSurfaceHigh">
      {tx.asset?.mandatoryKeys?.length}
    </span>
  ),
}
