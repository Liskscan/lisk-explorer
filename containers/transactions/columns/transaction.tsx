import { TransactionDataType } from "@moosty/lisk-service-provider"
import { TableQueryColsProp } from "@Types"

export const transaction: TableQueryColsProp = {
  value: "Transaction",

  format: (tx: TransactionDataType) => (
    <div className={"flex flex-row font-medium "}>
      <div className={"flex flex-row"}>
        <span className={" text-onSurfaceMedium"}>
          {tx.moduleAssetName.split(":")[0]}
        </span>
      </div>
      <span className=" px-1 text-onSurfacePrimaryHigh">|</span>
      <div className={"flex flex-row"}>
        <span className={"text-onSurfaceMedium"}>
          {tx.moduleAssetName.split(":")[1]}
        </span>
      </div>
    </div>
  ),
}
