import { TransactionDataType } from "@moosty/lisk-service-provider"
import { Avatar, Link } from "components/ui"
import { TableQueryColsProp } from "@Types"
import { compactString } from "utils/format"

export const recipient: TableQueryColsProp = {
  value: "Recipient",
  format: (tx: TransactionDataType) =>
    tx?.moduleAssetId === "2:0" ? (
      <Link
        href={`/account/[[...slug]]`}
        color="onSurfaceLinkHigh"
        link={`/account/${tx?.asset?.recipient?.address}`}
      >
        <span className="flex items-center flex-row text-onSurfaceLinkHigh font-medium ">
          <Avatar
            className="mr-2"
            address={tx?.asset?.recipient?.address}
            size={20}
          />
          {tx?.asset?.recipient?.username ||
            compactString(tx?.asset?.recipient?.address, 23)}
        </span>
      </Link>
    ) : (
      ""
    ),
}
