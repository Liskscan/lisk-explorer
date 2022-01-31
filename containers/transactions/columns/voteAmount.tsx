import { TransactionDataType } from "@moosty/lisk-service-provider"
import { Currency } from "components/ui"
import { TableQueryColsProp } from "@Types"

export const voteAmount: TableQueryColsProp = {
  align: "right",
  value: "Vote weight",
  format: (tx: TransactionDataType) => {
    const amount = tx.asset?.votes?.reduce(
      (sum: string, uo: any) => (BigInt(sum) + BigInt(uo.amount)).toString(),
      "0",
    )
    return (
      <span
        className={[
          "font-medium whitespace-nowrap text-onSurfacePrimaryLow",
        ].join(" ")}
      >
        {(amount || amount === "0") && (
          <Currency
            classes={{
              sign: "text-onSurfaceLow font-medium",
              symbol: "text-onSurfaceLow font-medium",
              separator: "text-onSurfacePrimaryMedium",
              number: "text-onSurfacePrimaryMedium font-medium",
              decimals: "text-onSurfacePrimaryMedium",
            }}
            beddows={amount}
            forceDecimals={0}
          />
        )}
      </span>
    )
  },
}
