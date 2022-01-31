import { FC } from "react"
import { TransactionDataType } from "@moosty/lisk-service-provider"
import { KeyValueRow, Paper } from "components/ui"

export const Type: FC<{ transaction: TransactionDataType }> = ({
  transaction,
}) => {
  return (
    <div className="flex flex-col md:flex-row w-full mx-auto md:space-x-4 justify-center mb-1 md:mb-4">
      <Paper
        className=" z-20 text-onSurfaceMedium flex-wrap md:flex-nowrap justify-around md:justify-between w-full  p-2 md:p-4  "
        surface={1}
        shadow={0}
      >
        <h1 className="text-xl font-bold mb-2">Transaction Module & Type</h1>
        <div className="flex z-20 flex-wrap md:flex-nowrap flex-col md:flex-row justify-around md:justify-between w-full ">
          <div className="flex flex-col flex-grow justify-between rounded md:p-5 ">
            <div>
              <KeyValueRow
                label={`Module (${
                  transaction?.moduleAssetId?.split(":")?.[0]
                })`}
                value={`${transaction?.moduleAssetName?.split(":")?.[0]}`}
                className={"md:text-center capitalize"}
              />
            </div>
            <div>
              <KeyValueRow
                label={`Asset (${transaction?.moduleAssetId?.split(":")?.[1]})`}
                value={`${transaction?.moduleAssetName?.split(":")?.[1]}`}
                className={"md:text-center  capitalize"}
              />
            </div>
          </div>
        </div>
      </Paper>
    </div>
  )
}
