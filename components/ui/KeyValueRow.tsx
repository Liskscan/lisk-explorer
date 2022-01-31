import { FC } from "react"
import { Paper } from "components"
import { format } from "utils"

export const KeyValueRow: FC<{
  label?: any | string
  value?: any | string
  className?: string
  classNameValue?: string
  icon?: any | string
  compactOnMobile?: boolean
  surface?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
}> = ({
  compactOnMobile,
  label,
  value,
  className,
  classNameValue,
  icon,
  surface = 0,
}) => (
  <Paper
    surface={surface}
    className={[
      "flex flex-col md:flex-row w-full mb-2 md:mb-1",
      "items-center rounded text-lg",
      className ? className : "",
    ].join(" ")}
  >
    <div className="flex md:flex-grow flex-col md:flex-row justify-between w-full">
      <span className="capitalize font-medium  text-onSurfaceMedium md:mr-2 md:capitalize ">
        {label}
      </span>
      <div
        className={`hidden md:block font-medium text-onSurfaceHigh ${classNameValue}`}
      >
        {value}
      </div>
      <div className={`md:hidden flex-row flex justify-between `}>
        <span className={` ${classNameValue} `}>
          {compactOnMobile ? format.compactString(value, 35) : value}
        </span>
        <div style={{ width: 40 }}>{icon}</div>
      </div>
    </div>
    <div className="hidden md:block" style={{ width: 30 }}>
      {icon}
    </div>
  </Paper>
)
