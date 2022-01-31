import { TransactionDataType } from "@moosty/lisk-service-provider"
import { Link } from "components/ui"
import { compactString } from "utils/format"

export const id = {
  value: "ID",
  format: (tx: TransactionDataType) => (
    <Link
      color="onSurfaceLinkHigh"
      href={`/transaction/[transactionId]`}
      link={`/transaction/${tx.id}`}
    >
      {compactString(tx.id, 20)}
    </Link>
  ),
}
