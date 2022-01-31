import { FC } from "react"
import { Paper } from "components/ui"
import moment from "moment"
import { useServiceEvents } from "@moosty/lisk-service-events"
import { DelegateAccountData } from "@Types"

export const PoMHeights: FC<{
  delegate: DelegateAccountData
}> = ({ delegate }) => {
  const { block } = useServiceEvents()
  return (
    <Paper
      className="flex flex-col flex-grow md:bg-surfaceDark p-5 mx-auto w-full md:w-app max-w-app"
      shadow={0}
      surface={2}
    >
      <h1 className="text-xl font-bold mb-2">
        Punishment history (
        {delegate?.dpos?.delegate?.pomHeights &&
          delegate.dpos.delegate.pomHeights.length}
        ):
      </h1>
      <div className="flex flex-row space-x-4">
        {delegate?.dpos?.delegate?.pomHeights?.map((item: any) => {
          if (block?.height < item.end) {
            return (
              <div>
                <div className="w-auto rounded p-2 mb-2  cursor-pointer flex flex-col justify-between items-center bg-background transform duration-100 ease-in-out ">
                  <span className="text-base rounded bg-surfaceSecondary text-onSurfacePrimaryMedium w-full flex flex-col justify-between items-left">
                    <span className=" font-bold ">Active punishment </span>
                    <span>From: {item.start}</span>
                    <span>Until: {item.end}</span>
                  </span>
                  <div className="text-onWarning bg-warning rounded px-2 py-1 mt-1 text-center">
                    Punishment ends &nbsp;
                    <span className="font-bold text-onWarning">
                      {`${moment()
                        .add((item.end - block?.height) * 10, "seconds")
                        .fromNow()}`}
                    </span>
                  </div>
                </div>
              </div>
            )
          }
          return (
            <div>
              <div className="w-auto rounded p-2 mb-2  cursor-pointer flex flex-col justify-between items-center bg-background transform duration-100 ease-in-out ">
                <span className="text-base rounded bg-surfaceSecondary text-onSurfacePrimaryMedium w-full flex flex-col justify-between items-left">
                  <span className=" font-bold ">Past punishment </span>
                  <span>From: {item.start}</span>
                  <span>Until: {item.end}</span>
                </span>
                <div className="text-onWarning bg-warning rounded px-2 py-1 mt-1 text-center">
                  Punishment finished
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Paper>
  )
}
