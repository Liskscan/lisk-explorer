import { FC } from "react"
import moment from "moment"
import { Paper } from "components/ui"
import { AccountDataType } from "@moosty/lisk-service-provider"
import { useServiceEvents } from "@moosty/lisk-service-events"
import { IncomingVotes } from "@Components"

export const Unlocking: FC<{ account: AccountDataType }> = ({ account }) => {
  const { block } = useServiceEvents()
  return (
    <Paper
      className="flex flex-col flex-grow p-4 mx-auto w-full w-app max-w-app"
      surface={1}
    >
      <h1 className="text-lg font-bold ml-3 mb-2 text-onSurfacePrimaryHigh">
        Currently Unlocking
        <span className="text-onSurfacePrimaryMedium">
          ({account?.dpos?.unlocking?.length})
        </span>
        :
      </h1>
      <div className="flex flex-col md:flex-row flex-wrap md:space-x-4">
        {account?.dpos?.unlocking &&
          account?.dpos?.unlocking?.map((item: any) => (
            <div
              className="flex flex-col"
              key={`unlocking-${item?.delegateAddress}`}
            >
              <IncomingVotes
                address={item?.delegateAddress}
                amount={item?.amount}
                requestUsername
              />
              {item?.height?.end - block?.height > 0 && (
                <div className="text-onWarning bg-warning rounded px-2 py-1 text-center">
                  can be unlocked&nbsp;
                  <span className="font-medium text-onLight">
                    {moment()
                      .add((item?.height?.end - block?.height) * 10, "seconds")
                      .fromNow()}
                  </span>
                </div>
              )}
              {item?.height?.end - block?.height <= 0 && (
                <div className="text-onSuccess bg-success rounded px-2 py-1 text-center">
                  can be unlocked now
                </div>
              )}
            </div>
          ))}
      </div>
    </Paper>
  )
}
