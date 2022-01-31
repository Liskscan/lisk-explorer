import { TransactionDataType } from "@moosty/lisk-service-provider"
import { Avatar, Link } from "components/ui"
import { TableQueryColsProp } from "@Types"
import { getLisk32AddressFromPublicKey } from "utils/lisk"

export const pomDelegate: TableQueryColsProp = {
  value: "Punished Delegate",
  format: (tx: TransactionDataType) => {
    const address = tx?.asset?.header1?.generatorPublicKey
      ? getLisk32AddressFromPublicKey(
          Buffer.from(tx?.asset?.header1?.generatorPublicKey, "hex"),
        )
      : ""
    return (
      <Link
        color="onSurfaceLinkHigh"
        href={`/account/[[...slug]]`}
        link={`/account/${address}`}
      >
        <span className="flex flex-row font-medium">
          <Avatar
            className="mr-2"
            username={true}
            address={address}
            size={20}
          />
        </span>
      </Link>
    )
  },
}
