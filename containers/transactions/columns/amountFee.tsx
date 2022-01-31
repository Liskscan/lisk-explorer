import { TransactionDataType } from "@moosty/lisk-service-provider"
import { Currency } from "components/ui"
import { TableQueryColsProp } from "@Types"

export const amountFee: TableQueryColsProp = {
  value: "",
  format: (transaction: TransactionDataType) => {
    return (
      <div className={"text-right"}>
        <span className={""}>
          {transaction?.asset?.amount ? (
            <Currency
              classes={{
                sign: "text-onSurfaceLow font-medium",
                symbol: "text-onSurfaceLow font-medium",
                separator: "text-onSurfacePrimaryMedium",
                number: "text-onSurfacePrimaryMedium font-medium",
                decimals: "text-onSurfacePrimaryMedium",
              }}
              beddows={transaction.asset.amount}
            />
          ) : (
            "-"
          )}
        </span>
        <br />
        <span className={"mr-1 text-onSurfaceLow"}>Fee</span>
        <Currency
          classes={{
            sign: "text-onSurfaceLow font-medium",
            symbol: "text-onSurfaceLow font-medium",
            separator: "text-onSurfacePrimaryMedium",
            number: "text-onSurfacePrimaryMedium font-medium",
            decimals: "text-onSurfacePrimaryMedium",
          }}
          beddows={transaction.fee}
        />
      </div>
    )
  },
}
