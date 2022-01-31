import { FC } from "react"
import { Combo } from "./Combo"

export const Group: FC<{ title: string; keys: any[] }> = ({ title, keys }) => (
  <div className="flex flex-col space-y-4 w-1/3">
    <h1 className={"font-bold text-xl text-onPrimaryMedium"}>{title}</h1>
    {keys.map(({ label, keys }) => (
      <Combo key={label} label={label} keys={keys} />
    ))}
  </div>
)
