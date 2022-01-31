import { Currency } from "components/ui"
import { TableDelegateColsProp } from "../DelegateTable"
import { DelegateAccountData } from "@Types"

export const selfVote = {
  align: "right",
  value: "Self Vote",
  format: (delegate: DelegateAccountData) => {
    return (
      <span className="font-medium text-onBackground">
        <Currency
          beddows={delegate?.liskScan?.selfVote?.toString() || "0"}
          forceDecimals={0}
        />
      </span>
    )
  },
} as TableDelegateColsProp
