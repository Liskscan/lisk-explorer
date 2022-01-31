import { TransactionDataType } from "@moosty/lisk-service-provider"
import { Avatar, Link } from "components/ui"
import { TableQueryColsProp } from "@Types"

export const registerName: TableQueryColsProp = {
  value: "Delegate name",
  format: (tx: TransactionDataType) => (
    <Link
      href={`/account/[[...slug]]`}
      color="onSurfaceLinkHigh"
      link={`/account/${tx?.sender?.address}`}
    >
      <span className="flex flex-row font-medium ">
        <Avatar className="mr-2" address={tx?.sender?.address} size={20} />
        {tx?.asset?.username}
      </span>
    </Link>
  ),
}
