import { TableQueryColsProp } from "@Types"
import { TransactionDataType } from "@moosty/lisk-service-provider"
import { IncomingVotes } from "components"

export const votes: TableQueryColsProp = {
  value: "Votes",
  format: (tx: TransactionDataType, foreign: { delegates: any }, n: number) => {
    return (
      <span className="flex flex-col ">
        {tx?.asset.votes &&
          tx?.asset.votes?.map((vote: any) => (
            <IncomingVotes
              key={`vote-${vote?.delegateAddress}`}
              color
              requestUsername
              username={
                vote?.username ||
                foreign?.delegates?.[vote?.delegateAddress]?.summary?.username
              }
              address={vote?.delegateAddress}
              amount={vote?.amount}
            />
          ))}
      </span>
    )
  },
}
