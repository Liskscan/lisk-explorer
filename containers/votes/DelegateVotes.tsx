import { FC } from "react"
import { Avatar, Link, Tooltip } from "components/ui"
import { DataWidget, SingleVoteReceived } from "@Types"
import { DataTable, IncomingVotes } from "@Components"
import { compactString, formatTime } from "utils/format"

export const DelegateVotes: FC<DataWidget> = ({
  limit = 10,
  offset = 0,
  filter = {},
  customSort,
  oddClassName,
  evenClassName,
  hoverClassName,
  headClassName,
  className,
  stickyHeader,
  button,
}) => {
  return (
    <DataTable
      emptyTable={"No votes found"}
      stickyHeader={stickyHeader}
      className={className}
      oddClassName={oddClassName}
      evenClassName={evenClassName}
      hoverClassName={hoverClassName}
      headClassName={headClassName}
      customSort={customSort}
      params={{ limit, offset, ...filter }}
      button={button}
      method={"get.votes_received"}
      limit={limit}
      iterator={"votes"}
      cols={[
        {
          value: "ID",
          format: (vote: SingleVoteReceived) => {
            return (
              <Link
                href={`/transaction/[transactionId]`}
                link={`/transaction/${vote.id}`}
              >
                <div className={"whitespace-nowrap"}>
                  {compactString(vote.id, 18)}
                </div>
              </Link>
            )
          },
        },
        {
          value: "Date",
          format: (vote: SingleVoteReceived) => {
            return (
              <Tooltip label={formatTime(vote.timestamp, false, false)}>
                <div className={"whitespace-nowrap"}>
                  {formatTime(vote.timestamp)}
                </div>
              </Tooltip>
            )
          },
        },
        {
          value: "Sender",
          format: (vote: SingleVoteReceived) => (
            <Link
              href={`/account/[[...slug]]`}
              link={`/account/${vote.address}`}
            >
              <Tooltip label={vote.id}>
                <span className="flex flex-row ">
                  <Avatar className="mr-2" address={vote.address} size={20} />
                  {vote.username || compactString(vote.address, 26)}
                </span>
              </Tooltip>
            </Link>
          ),
        },
        {
          value: "Votes",
          format: (vote: SingleVoteReceived, n) => (
            <span className="flex flex-col ">
              <IncomingVotes
                key={`vote-${vote.id}-${vote?.username}-${n}`}
                color
                username={filter.username}
                amount={vote?.amount}
              />
            </span>
          ),
        },
      ]}
    />
  )
}
