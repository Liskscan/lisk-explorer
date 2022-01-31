import { FC, useState } from "react"
import { TooltipProps } from "@Types"

export const Tooltip: FC<TooltipProps> = ({
  positionTop,
  className,
  children,
  label,
  positionBottom,
}) => {
  const [visibility, setVisibility] = useState(false)

  return (
    <div
      onMouseEnter={() => setVisibility(true)}
      onMouseLeave={() => setVisibility(false)}
    >
      {children}
      <div
        className={[
          visibility ? "inline-block" : "hidden",
          "absolute mx-auto bg-background text-onSurfaceHigh",
          "max-w-sm p-2 px-4 text-base text-center rounded",
          "shadow-lg  z-50 flex place-self-auto",
          positionBottom
            ? "flex place-self-auto mt-2"
            : positionTop
            ? "flex place-self-auto -mt-14"
            : "-mt-14",
          className,
        ].join(" ")}
      >
        {label}
      </div>
    </div>
  )
}
