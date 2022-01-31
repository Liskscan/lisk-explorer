import { TransactionDataType } from "@moosty/lisk-service-provider"
import { Avatar, Link } from "components/ui"
import { compactString } from "utils/format"
import { TableQueryColsProp } from "@Types"

export const sender: TableQueryColsProp = {
  value: "Sender",
  format: (tx: TransactionDataType) => (
    <Link
      href={`/account/[[...slug]]`}
      link={`/account/${tx?.sender?.address}`}
    >
      <span className="flex items-center flex-row font-medium text-onSurfaceLinkHigh ">
        <Avatar className="mr-2" address={tx?.sender?.address} size={20} />
        {tx?.sender?.username || compactString(tx?.sender?.address, 23)}
      </span>
    </Link>
  ),
}
