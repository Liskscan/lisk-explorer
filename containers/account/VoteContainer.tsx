import { FC } from "react"
import { AccountDataType } from "@moosty/lisk-service-provider"
import { DelegateVotesSent } from "containers/account/DelegateVotesSent"
import { Paper } from "components/ui"
import { IncomingVotesList } from "@Components"

export const VoteContainer: FC<{
  account: AccountDataType
  votes?: any[] | null
  votesTotal?: number | null
}> = ({ account, votesTotal, votes }) => (
  <Paper surface={1}>
    {account?.dpos?.sentVotes && <DelegateVotesSent account={account} />}
    {account?.summary?.isDelegate && (
      <IncomingVotesList
        address={account?.summary?.address}
        votes={votes}
        votesTotal={votesTotal}
      />
    )}
  </Paper>
)
