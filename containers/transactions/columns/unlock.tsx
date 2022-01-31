import { TransactionDataType } from "@moosty/lisk-service-provider"
import { Currency } from "components/ui"
import { TableQueryColsProp } from "@Types"

export const unlock: TableQueryColsProp = {
  align: "right",
  value: "Unlock amount",
  format: (tx: TransactionDataType) => {
    const amount = tx.asset?.unlockObjects?.reduce(
      (sum: string, uo: any) => BigInt(sum) + BigInt(uo.amount),
      "0",
    )
    return (
      <span
        className={[
          "font-medium whitespace-nowrap text-onSurfacePrimaryLow",
        ].join(" ")}
      >
        {amount && <Currency beddows={amount} forceDecimals={0} />}
      </span>
    )
  },
}
