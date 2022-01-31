import { TransactionDataType } from "@moosty/lisk-service-provider"
import { Avatar, Link } from "components/ui"
import { TableQueryColsProp } from "@Types"

export const senderAddress: TableQueryColsProp = {
  value: "Sender",
  format: (tx: TransactionDataType) => (
    <Link
      color="onSurfaceLinkHigh"
      href={`/account/[[...slug]]`}
      link={`/account/${tx?.sender?.address}`}
    >
      <span className="flex flex-row font-medium">
        <Avatar className="mr-2" address={tx?.sender?.address} size={20} />
        {tx?.sender?.address}
      </span>
    </Link>
  ),
}
