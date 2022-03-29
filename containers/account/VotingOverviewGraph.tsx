import { FC } from "react"
import { Doughnut } from "react-chartjs-2"
import { Currency } from "components/ui/Currency"
import { Paper } from "components/ui"
import { convertBeddowsToLSK } from "utils/lisk"
import { DelegateAccountData } from "@Types"

export const VotingOverviewGraph: FC<{ delegate: DelegateAccountData }> = ({
  delegate,
}) => {
  return (
    <Paper
      surface={0}
      rounded
      className="flex space-y-6   hidden md:block  flex-row  w-full  "
    >
      <div className="mx-auto hidden md:block  my-auto align-middle p-4">
        <div className="w-full flex flex-row justify-between items-center p-2 px-4 bg-primary text-white font-medium  rounded mx-auto ">
          <span className="mr-2">total vote weight</span>
          <span className="text-xl">
            <Currency
              classes={{
                sign: "text-onPrimaryLight font-medium",
                symbol: "text-onPrimaryLight font-medium",
                separator: "text-onPrimaryLight",
                number: "text-onPrimaryLight font-medium",
                decimals: "text-onPrimaryLight",
              }}
              beddows={delegate?.liskScan?.voteWeight}
              forceDecimals={0}
            />
          </span>
        </div>
        {delegate?.summary?.isDelegate && (
          <div className=" py-4">
            <Doughnut
              key="donut"
              options={{
                animation: false,
                //@ts-ignore
                borderWidth: 4,
                hoverBorder: 10,
                plugins: {
                  legend: {
                    display: false,
                  },
                },

              }}
              data={{
                labels: ["Selfvote", "Received Vote", "Voteweight Left"],
                datasets: [
                  {
                    label: "Voteweight",
                    data: [
                      parseInt(
                        convertBeddowsToLSK(
                          delegate?.liskScan?.selfVote || "0",
                        ),
                      ),
                      parseInt(
                        convertBeddowsToLSK(
                          (
                            BigInt(
                              delegate?.dpos?.delegate?.totalVotesReceived || 0,
                            ) - BigInt(delegate?.liskScan?.selfVote || 0)
                          ).toString() || "0",
                        ),
                      ),
                      parseInt(
                        convertBeddowsToLSK(
                          (
                            BigInt(delegate?.liskScan?.maxVoteWeight || 0) -
                            BigInt(
                              delegate?.dpos?.delegate?.totalVotesReceived || 0,
                            )
                          ).toString() || "0",
                        ),
                      ),
                    ],
                    backgroundColor: ["#4070F4FF", "#F7E36D", "#C5CFE4FF"],
                    hoverOffset: 10,
                  },
                ],
              }}
            />
          </div>
        )}

      </div>
    </Paper>
  )
}
