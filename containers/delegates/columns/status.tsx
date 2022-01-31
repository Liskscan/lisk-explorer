import {
  ExclamationCircleIcon,
  ExclamationIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/solid"
import { Tooltip } from "components/ui"
import { MinusCircleIcon } from "@heroicons/react/outline"
import { TableDelegateColsProp } from "../DelegateTable"
import { ForgersDataType } from "@moosty/lisk-service-provider"
import { Time } from "@Components"
import { DelegateAccountData } from "@Types"

export const status = {
  align: "left",
  value: "Status",
  width: "180px",
  format: (delegate: DelegateAccountData, forgers: ForgersDataType[]) => {
    if (delegate?.dpos?.delegate?.isBanned) {
      return (
        <div className="flex flex-row items-center whitespace-nowrap">
          <ExclamationCircleIcon className="w-5 h-5 text-error" />
          <span>Banned</span>
        </div>
      )
    }
    switch (delegate.dpos?.delegate?.status) {
      case "active":
        const nextForgingTime =
          forgers.find(
            (forger) => forger.address === delegate?.summary?.address,
          )?.nextForgingTime || 0
        return delegate.dpos?.delegate?.consecutiveMissedBlocks &&
          delegate.dpos?.delegate?.consecutiveMissedBlocks > 0 ? (
          <Tooltip
            label={`${delegate.dpos?.delegate?.consecutiveMissedBlocks} missed blocks`}
          >
            <div className="flex flex-row font-medium items-center text-onSurfacePrimaryMedium bg-surface-2 rounded px-2 py-1 whitespace-nowrap">
              <span className={"rounded-full w-4 h-4 bg-red flex mr-2 "} />
              <Time timestamp={nextForgingTime} />
            </div>
          </Tooltip>
        ) : (
          <div className="flex flex-row font-medium items-center text-onSurfacePrimaryMedium bg-surface-2 rounded px-2 py-1 whitespace-nowrap">
            <span className={"rounded-full w-4 h-4 bg-green flex mr-2"} />
            <Time timestamp={nextForgingTime} />
          </div>
        )
      case "punished":
        return (
          <div className="flex flex-row items-center bg-warning rounded px-2 py-1 whitespace-nowrap">
            <ExclamationIcon className="w-5 h-5 mr-4 text-onWarning" />
            <span className="font-medium text-onWarning">Punished</span>
          </div>
        )
      case "standby":
        return BigInt(delegate?.liskScan?.voteWeight) > 99000000000n ? (
          delegate?.dpos?.delegate?.consecutiveMissedBlocks &&
          delegate?.dpos?.delegate?.consecutiveMissedBlocks > 0 ? (
            <Tooltip
              label={`${delegate.dpos?.delegate?.consecutiveMissedBlocks} missed blocks`}
            >
              <div className="flex flex-row items-center bg-primary  rounded px-2 py-1 whitespace-nowrap">
                <span className={"rounded-full w-4 h-4 bg-error flex mr-2 "} />{" "}
                <span className="font-medium text-onPrimaryHigh">Stand-by</span>
              </div>
            </Tooltip>
          ) : (
            <div className="flex flex-row items-center bg-primary rounded px-2 py-1 whitespace-nowrap">
              <MinusCircleIcon className="h-5 w-5  mr-4 text-onPrimaryHigh" />
              <span className="font-medium text-onPrimaryHigh">Stand-by</span>
            </div>
          )
        ) : (
          <div className="flex flex-row items-center bg-primary  rounded px-2 py-1 whitespace-nowrap">
            <MinusCircleIcon className="h-5 w-5  mr-4 text-onPrimaryHigh" />
            <span className="font-medium text-onPrimaryHigh">Aspiring</span>
          </div>
        )
      case "non-eligible":
        return (
          <div className="flex flex-row items-center bg-primary  rounded px-2 py-1 whitespace-nowrap">
            <MinusCircleIcon className="h-5 w-5  mr-4 text-onPrimaryHigh" />
            <span className="font-medium text-onPrimaryHigh">non-eligible</span>
          </div>
        )
      case undefined:
        return (
          <div className="flex flex-row items-center whitespace-nowrap">
            <Tooltip label={"awaiting selfvote finality"}>
              <QuestionMarkCircleIcon className="h-5 w-5 text-info mr-2 text-yellow" />
            </Tooltip>
          </div>
        )

      default:
        return <div>{delegate.dpos?.delegate?.status}</div>
    }
  },
} as TableDelegateColsProp
