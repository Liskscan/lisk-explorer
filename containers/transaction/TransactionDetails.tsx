import { FC } from "react"
import { KeyValueRow, Paper } from "components/ui"
import { TransactionDataType } from "@moosty/lisk-service-provider"
import { Currency } from "components/ui/Currency"

export const TransactionDetails: FC<{ transaction: TransactionDataType }> = ({
  transaction,
}) => {
  return (
    <div className="flex flex-col md:flex-row w-full mx-auto md:space-x-4 justify-center mb-1 md:mb-4">
      <Paper
        className="text-onSurfaceMedium z-20 flex-wrap md:flex-nowrap justify-around md:justify-between w-full p-2  md:p-5"
        surface={1}
      >
        <h1 className="text-xl font-bold mb-2 ">Details</h1>
        <div className="flex z-20 flex-wrap md:flex-nowrap flex-row justify-around md:justify-between w-full ">
          <div className="flex flex-col flex-grow justify-between rounded md:p-5 ">
            <div>
              <KeyValueRow
                label="Amount"
                value={
                  transaction?.asset?.amount ? (
                    <Currency beddows={transaction?.asset?.amount} />
                  ) : transaction?.asset?.unlockObjects ? (
                    <Currency
                      beddows={transaction?.asset?.unlockObjects
                        ?.reduce(
                          (sum: bigint, { amount }: { amount: string }) =>
                            sum + BigInt(amount),
                          BigInt(0),
                        )
                        ?.toString()}
                    />
                  ) : (
                    "-"
                  )
                }
                className={"md:text-center"}
              />
            </div>
            <div>
              <KeyValueRow
                label="Fee"
                value={<Currency beddows={transaction?.fee} />}
                className={"md:text-center"}
              />
            </div>
            <div>
              <KeyValueRow
                label="Nonce"
                value={transaction?.nonce}
                className={"md:text-center"}
              />
            </div>
          </div>
        </div>
      </Paper>
    </div>
  )
}
