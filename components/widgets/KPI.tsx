import { FC } from "react"
import { KPIProps } from "@Types"
import { Paper } from "@Components"

export const KPI: FC<KPIProps> = ({ label, value, icon }) => (
  <Paper
    rounded
    surface={0}
    shadow={0}
    className={[
      "w-full flex justify-between flex-row",
      "md:mx-auto py-2 p-2 items-center",
    ].join(" ")}
  >
    <div className="flex flex-row align-middle items-center">
      <div className="mr-2 text-onSurfacePrimaryLow">{icon}</div>
      <div className="flex flex-col">
        <div className="text-lg font-medium text-onSurfacePrimaryMedium">
          {value}
        </div>
        <div className="font-medium md:text-xs text-onSurfaceMedium">
          {label}
        </div>
      </div>
    </div>
  </Paper>
)
