import { TransactionDataType } from "@moosty/lisk-service-provider"
import { IncomingVotes } from "@Components"

export const votes = {
  value: "Votes",
  format: (tx: TransactionDataType, n: number) => (
    <span className="flex flex-col ">
      {tx?.asset.votes &&
        tx?.asset.votes?.map((vote: any) => (
          <IncomingVotes
            key={`vote-${tx.id}-${vote?.delegateAddress}-${n}`}
            color
            requestUsername
            address={vote?.delegateAddress}
            amount={vote?.amount}
          />
        ))}
    </span>
  ),
}
