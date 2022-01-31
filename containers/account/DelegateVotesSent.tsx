import { FC } from "react"
import { AccountDataType } from "@moosty/lisk-service-provider"
import { Paper } from "components/ui"
import { IncomingVotes } from "@Components"

export const DelegateVotesSent: FC<{ account: AccountDataType }> = ({
  account,
}) => (
  <>
    {account?.dpos?.sentVotes?.length && (
      <Paper className="flex flex-col w-auto p-2 py-4" shadow={0} surface={1}>
        <h1 className="text-lg font-bold ml-3 mb-2 text-onSurfacePrimaryHigh">
          This account votes for{" "}
          <span className="text-onSurfacePrimaryMedium">
            ({account?.dpos?.sentVotes?.length})
          </span>
          :
        </h1>
        <div className="flex flex-col md:flex-row flex-wrap wrap cursor-pointer space-x-3 mt-1">
          {account?.dpos?.sentVotes &&
            account?.dpos?.sentVotes?.map((item, i) => (
              <div
                key={item?.delegateAddress}
                className={[i === 0 && "ml-3"].join(" ")}
              >
                <IncomingVotes
                  address={item?.delegateAddress}
                  amount={item?.amount || "0"}
                  requestUsername
                />
              </div>
            ))}
        </div>
      </Paper>
    )}
  </>
)
