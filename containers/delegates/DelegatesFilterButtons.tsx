import { FC } from "react"
import { FilterButtons } from "@Components"

export const DelegatesFilterButtons: FC<{
  onUpdate(state: string): void
  state: string
}> = ({ onUpdate, state }) => {
  return (
    <div className=" flex flex-row flex-wrap space-x-4 w-full">
      <FilterButtons
        className="flex flex-row flex-wrap -mb-2 w-full"
        buttons={[
          { label: `All Delegates`, state: "all" },
          { label: `Active`, state: "active" },
          { label: `Standby`, state: "standby" },
          { label: `Punished`, state: "punished" },
          { label: `Banned`, state: "banned" },
          { label: `Non Eligible`, state: "non-eligible" },
        ]}
        selection={state}
        defaultState={"all"}
        onChange={onUpdate}
      />
    </div>
  )
}
