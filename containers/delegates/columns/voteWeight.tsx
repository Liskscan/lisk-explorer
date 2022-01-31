import { Currency } from "components/ui"
import { TableDelegateColsProp } from "../DelegateTable"
import { DelegateAccountData } from "@Types"

export const voteWeight = {
  width: "150px",
  align: "right",
  value: "Vote Weight",
  format: (delegate: DelegateAccountData) => {
    return (
      <span
        data-tip="This is voteweight"
        className="font-medium text-onBackground "
      >
        <Currency
          beddows={delegate?.liskScan?.voteWeight || "123"}
          forceDecimals={0}
        />
      </span>
    )
  },
} as TableDelegateColsProp
