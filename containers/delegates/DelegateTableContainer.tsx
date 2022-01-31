import { FC, useState } from "react"
import { DelegateTable } from "containers/delegates/DelegateTable"
import { DelegateStatusTypes } from "@moosty/lisk-connection-provider/dist/types"
import { DelegatesFilterButtons } from "containers/delegates/DelegatesFilterButtons"
import { delegateColumns } from "./columns"
import { ForgersDataType } from "@moosty/lisk-service-provider"
import { DelegateAccountData } from "@Types"

export const DelegateTableContainer: FC<{
  delegatesSSR: DelegateAccountData[]
  forgersSSR: ForgersDataType[]
}> = ({ delegatesSSR, forgersSSR }) => {
  const [status, setStatus] = useState<DelegateStatusTypes[]>([
    "active",
    "standby",
    "punished",
    "non-eligible",
    "banned",
  ])
  const updateStatus = (newStatus: DelegateStatusTypes | string) => {
    if (newStatus === "all") {
      setStatus(["active", "standby", "punished", "non-eligible", "banned"])
    } else {
      setStatus([newStatus as DelegateStatusTypes])
    }
  }

  return (
    <>
      <DelegatesFilterButtons
        state={!status || status.length > 1 ? "all" : status[0]}
        onUpdate={updateStatus}
      />
      <div className="mx-auto w-full w-full ">
        <DelegateTable
          delegatesSSR={delegatesSSR}
          forgersSSR={forgersSSR}
          hoverClassName="hover:bg-surface-3"
          oddClassName="bg-surface"
          evenClassName="bg-surface"
          headClassName="bg-surface-1"
          filter={{ status }}
          cols={[
            delegateColumns.rank,
            delegateColumns.name,
            {
              ...delegateColumns.status,
              format: delegateColumns.status.format.bind(forgersSSR),
            },
            delegateColumns.forged,
            delegateColumns.voteWeight,
            delegateColumns.votesReceived,
            delegateColumns.selfVote,
            delegateColumns.capacity,
          ]}
        />
      </div>
    </>
  )
}
