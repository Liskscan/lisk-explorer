import { FC } from "react"
import { TransactionDataType } from "@moosty/lisk-service-provider"
import { KeyValueRow, Paper } from "components/ui"
import { ParseAsset } from "containers/transaction/ParseAsset"
import { Currency } from "components/ui/Currency"

export const Asset: FC<{
  transaction: TransactionDataType
}> = ({ transaction }) => {
  return (
    <div className="flex flex-col md:flex-row w-full mx-auto md:space-x-4 justify-center mb-2 md:mb-4">
      <Paper
        className="text-onSurfaceMedium flex-wrap md:flex-nowrap justify-around md:justify-between w-full p-2 md:p-5 "
        surface={1}
      >
        <h1 className=" text-xl md:text-xl font-bold mb-2 ">Assets</h1>
        <div className="flex flex-wrap md:flex-nowrap flex-row justify-around md:justify-between w-full">
          <div className="flex flex-col flex-grow justify-between rounded md:p-5 ">
            {transaction?.asset &&
              Object.keys(transaction.asset).map((assetKey, i) => {
                if (assetKey === "amount") {
                  return (
                    <KeyValueRow
                      key={`${assetKey}-amount-${transaction.id}-${i}`}
                      label={assetKey}
                      value={<Currency beddows={transaction.asset[assetKey]} />}
                    />
                  )
                }
                if (
                  typeof transaction.asset[assetKey] === "string" ||
                  typeof transaction.asset[assetKey] === "number"
                ) {
                  return (
                    <KeyValueRow
                      key={`${assetKey}-single-${transaction.id}`}
                      label={assetKey}
                      value={transaction.asset[assetKey]}
                    />
                  )
                }
                return (
                  <div key={`${assetKey}-group-${transaction.id}-${i}`}>
                    <span className="md:font-bold mr-2 uppercase md:capitalize">
                      {assetKey}
                    </span>
                    <div className="mt-2 ml-4 capitalize">
                      {ParseAsset(transaction.asset[assetKey])}
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </Paper>
    </div>
  )
}
