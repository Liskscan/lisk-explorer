import { FC } from "react"
import { PoMHeights } from "containers/account/PoMHeights"
import { Paper } from "components/ui"
import { VotingOverviewGraph } from "containers/account/VotingOverviewGraph"
import {
  CalculatorIcon,
  CubeTransparentIcon,
  PresentationChartLineIcon,
  RefreshIcon,
  ScaleIcon,
} from "@heroicons/react/solid"
import { Currency } from "components/ui/Currency"
import { KPI } from "@Components"
import { DelegateAccountData } from "@Types"

export const DelegateContainer: FC<{ delegate: DelegateAccountData }> = ({
  delegate,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:space-x-4 mx-auto w-full w-app max-w-app ">
      {delegate?.dpos?.delegate?.pomHeights && (
        <PoMHeights delegate={delegate} />
      )}
      {parseInt(delegate.liskScan.selfVote) > 0 && (
        <Paper
          surface={0}
          className="hidden md:block flex flex-wrap md:flex-nowrap flex-col md:flex-row justify-around w-full md:w-1/4  "
        >
          <VotingOverviewGraph delegate={delegate} />
        </Paper>
      )}
      {parseInt(delegate.liskScan.selfVote) > 0 && (
        <Paper className="flex flex-col flex-grow md:p-2 md:w-1/4" surface={1}>
          <KPI
            icon={<ScaleIcon className="h-5 w-5" />}
            label={"vote weight"}
            value={<Currency beddows={delegate?.liskScan?.voteWeight} />}
          />
          <KPI
            icon={<RefreshIcon className="h-5 w-5" />}
            label={"self vote"}
            value={<Currency beddows={delegate?.liskScan?.selfVote} />}
          />
          <KPI
            icon={<PresentationChartLineIcon className="h-5 w-5" />}
            label={"max vote weight"}
            value={<Currency beddows={delegate?.liskScan?.maxVoteWeight} />}
          />
          <KPI
            icon={<CubeTransparentIcon className="h-5 w-5" />}
            label={"vote capacity"}
            value={`${delegate?.liskScan?.capacity}%`}
          />
          <KPI
            icon={<CalculatorIcon className="h-5 w-5" />}
            label={"self vote needed for optimal capacity"}
            value={
              <Currency
                beddows={
                  delegate?.liskScan?.missingSelfVote?.substr(0, 1) !== "-"
                    ? delegate?.liskScan?.neededSelfVote
                    : "0"
                }
              />
            }
          />
          <KPI
            icon={<CalculatorIcon className="h-5 w-5" />}
            label={"missing self vote for optimal capacity"}
            value={
              <Currency
                beddows={
                  delegate?.liskScan?.missingSelfVote?.substr(0, 1) !== "-"
                    ? delegate?.liskScan?.missingSelfVote
                    : "0"
                }
              />
            }
          />
          <KPI
            icon={<ScaleIcon className="h-5 w-5" />}
            label={"total votes received"}
            value={
              <Currency
                beddows={delegate?.dpos?.delegate?.totalVotesReceived || "0"}
              />
            }
          />
        </Paper>
      )}
    </div>
  )
}
