import { Tooltip } from "components/ui"
import { TableDelegateColsProp } from "../DelegateTable"
import { DelegateAccountData } from "@Types"

export const capacity = {
  align: "right",
  value: "Vote Capacity",
  format: (delegate: DelegateAccountData) => {
    if (parseInt(delegate?.liskScan?.capacity) > 100) {
      return (
        <Tooltip
          label={`this delegate does not leverage voteweight above 100%.`}
          positionTop
        >
          <span className={["text-red font-medium"].join(" ")}>
            {`${delegate?.liskScan?.capacity}%`}
          </span>
        </Tooltip>
      )
    }
    if (delegate?.liskScan?.capacity === "10") {
      return (
        <Tooltip label={`this delegate only has a self vote`} positionTop>
          <span className={["text-green font-medium "].join(" ")}>
            {`${delegate?.liskScan?.capacity}%`}
          </span>
        </Tooltip>
      )
    }
    if (parseInt(delegate?.liskScan?.capacity) > 0) {
      return (
        <Tooltip
          label={`this delegate leverages ${delegate?.liskScan?.capacity}% of his selfvote`}
          positionTop
        >
          <span className={["text-green font-medium"].join(" ")}>
            {`${delegate?.liskScan?.capacity}%`}
          </span>
        </Tooltip>
      )
    }
    if (delegate?.liskScan?.capacity === "0") {
      return (
        <Tooltip
          label={`this delegate leverages ${delegate?.liskScan?.capacity}% of his selfvote`}
          positionTop
        >
          <span className={["text-info font-medium"].join(" ")}>
            {`${delegate?.liskScan?.capacity}%`}
          </span>
        </Tooltip>
      )
    }
    return <>?</>
  },
} as TableDelegateColsProp
