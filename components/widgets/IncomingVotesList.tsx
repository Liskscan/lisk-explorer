import { FC, useEffect, useState } from "react"
import { useLiskService } from "@moosty/lisk-service-provider"
import { VotesReceivedDataType } from "@moosty/lisk-connection-provider"
import { Button, Paper } from "components/ui"
import { IncomingVotes } from "components/widgets/IncomingVotes"

export const IncomingVotesList: FC<{
  address: string
  votes?: any[] | null
  votesTotal?: number | null
}> = ({ address, votesTotal, votes }) => {
  const pageSize = 10
  const { serviceClient } = useLiskService()
  const [votesReceived, setVotesReceived] = useState<VotesReceivedDataType>({
    votes: votes,
    account: { votesReceived: votesTotal },
  } as VotesReceivedDataType)
  const [page, setPage] = useState<number>(1)
  useEffect(() => {
    if (serviceClient && address) {
      const getData = async () => {
        const { data } = (await serviceClient.get("get.votes_received", {
          address,
          offset: pageSize * page - pageSize,
          limit: pageSize,
          aggregate: true,
        })) as { data?: VotesReceivedDataType }
        if (data) {
          if (page === 1) {
            setVotesReceived(data as VotesReceivedDataType)
          } else if (votesReceived && page > 1 && data?.votes) {
            setVotesReceived({
              ...votesReceived,
              votes: [...votesReceived?.votes, ...data?.votes],
            } as VotesReceivedDataType)
          }
        }
      }
      getData()
    }
  }, [serviceClient, address, page])

  return (
    <Paper className="flex flex-col w-full p-2 py-4" surface={1}>
      <h1 className="text-lg font-bold ml-3  mb-2 text-onSurfacePrimaryHigh">
        Incoming Votes
        <span className="text-onSurfacePrimaryMedium">
          ({votesReceived?.account?.votesReceived || votesTotal})
        </span>
        :
      </h1>
      <div className="flex flex-col md:flex-row flex-wrap wrap cursor-pointer md:space-x-3 mt-1">
        {votesReceived &&
          votesReceived?.votes?.map((item, i) => (
            <div
              key={`vote-${item?.address}`}
              className={[i === 0 && "ml-3"].join(" ")}
            >
              <IncomingVotes
                address={item?.address}
                username={item?.username}
                amount={item?.amount.toString()}
                requestUsername
              />
            </div>
          ))}
      </div>
      {votesReceived &&
        votesReceived?.account?.votesReceived > page * pageSize && (
          <Button
            onClick={() => setPage(page + 1)}
            fullWidth
            className={
              "bg-menuButton text-onMenuButton hover:bg-surfac-4 hover:text-onSurfacePrimaryMedium cursor-pointer rounded p-4"
            }
            value={"Load more votes"}
          />
        )}
    </Paper>
  )
}
