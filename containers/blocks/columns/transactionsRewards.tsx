import { TableQueryColsProp } from "@Types"
import { BlockDataType } from "@moosty/lisk-service-provider"
import { Currency } from "components/ui"

export const transactionsRewards: TableQueryColsProp = {
  value: "",
  format: (block: BlockDataType) => (
    <div className={"text-right"}>
      <span className={"mr-1 text-onSurfaceLow"}>Transactions</span>
      <b className={"text-onSurfacePrimaryMedium font-bold"}>
        {block.numberOfTransactions}
      </b>
      <br />
      <span className={"mr-1 text-onSurfaceLow"}>Reward</span>
      <Currency
        classes={{
          sign: "text-onSurfaceLow font-medium",
          symbol: "text-onSurfaceLow font-medium",
          separator: "text-onSurfacePrimaryMedium",
          number: "text-onSurfacePrimaryMedium font-medium",
          decimals: "text-onSurfacePrimaryMedium",
        }}
        beddows={block.reward}
      />
    </div>
  ),
}
