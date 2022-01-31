import { TransactionDataType } from "@moosty/lisk-service-provider"
import { Link } from "components/ui"
import { TableQueryColsProp } from "@Types"
import { compactString } from "utils/format"

export const id: TableQueryColsProp = {
  value: "ID",
  format: (tx: TransactionDataType) => (
    <Link
      color="onSurfaceLinkHigh"
      href={`/transaction/[transactionId]`}
      link={`/transaction/${tx.id}`}
    >
      <span className=""> {compactString(tx.id, 15)}</span>
    </Link>
  ),
}
