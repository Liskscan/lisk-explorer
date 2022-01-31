import { TableDelegateColsProp } from "../DelegateTable"
import { AccountDataType } from "@moosty/lisk-service-provider"

export const forged = {
  value: "Forged",
  align: "right",
  format: (delegate: AccountDataType) => (
    <span className="font-medium text-onSurfaceMedium">
      {delegate.dpos?.delegate?.producedBlocks}
    </span>
  ),
} as TableDelegateColsProp
