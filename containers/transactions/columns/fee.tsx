import { TransactionDataType } from "@moosty/lisk-service-provider"
import { Currency } from "components/ui"
import { TableQueryColsProp } from "@Types"

export const fee: TableQueryColsProp = {
  align: "right",
  value: "Fee",
  format: (tx: TransactionDataType) => (
    <span className={"whitespace-nowrap"}>
      <Currency
        classes={{
          sign: "text-onSurfaceLow font-medium",
          symbol: "text-onSurfaceLow font-medium",
          separator: "text-onSurfacePrimaryMedium",
          number: "text-onSurfacePrimaryMedium font-medium",
          decimals: "text-onSurfacePrimaryMedium",
        }}
        beddows={tx?.fee}
      />
    </span>
  ),
}
