import { TableDelegateColsProp } from "../DelegateTable"
import { DelegateAccountData } from "@Types"

export const rank = {
  align: "center",
  value: "#",
  width: "20px",
  format: (delegate: DelegateAccountData) => (
    <span className="font-medium text-onSurfaceHigh">
      {delegate?.dpos?.delegate?.rank}
    </span>
  ),
} as TableDelegateColsProp
