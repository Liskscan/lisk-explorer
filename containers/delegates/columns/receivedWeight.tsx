import { Currency } from "components/ui"
import { TableDelegateColsProp } from "../DelegateTable"
import { DelegateAccountData } from "@Types"

export const votesReceived = {
  align: "right",

  value: "Received Vote Weight",
  format: (delegate: DelegateAccountData) => (
    <span className="font-medium text-onBackground">
      <Currency
        beddows={
          (
            BigInt(delegate?.dpos?.delegate?.totalVotesReceived || 0) -
            BigInt(delegate?.liskScan?.selfVote || 0)
          ).toString() || "0"
        }
        forceDecimals={0}
      />
    </span>
  ),
} as TableDelegateColsProp
