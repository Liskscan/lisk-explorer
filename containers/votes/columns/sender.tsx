import { TransactionDataType } from "@moosty/lisk-service-provider"
import { Avatar, Link } from "components/ui"
import { compactString } from "utils/format"

export const sender = {
  value: "Sender",
  format: (tx: TransactionDataType) => (
    <Link
      color="onSurfaceLinkHigh"
      href={`/account/[[...slug]]`}
      link={`/account/${tx?.sender?.address}`}
    >
      <span className="flex flex-row ">
        <Avatar className="mr-2" address={tx?.sender?.address} size={20} />
        {tx?.sender?.username || compactString(tx?.sender?.address, 26)}
      </span>
    </Link>
  ),
}
