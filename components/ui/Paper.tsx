import { FC } from "react"
import { PaperProps } from "@Types"

export const Paper: FC<PaperProps> = ({
  className,
  rounded = true,
  shadow,
  surface,
  children,
}) => (
  <div
    className={[
      rounded && "rounded",
      shadow && `shadow-${shadow}`,
      `bg-surface-${surface || 0}`,
      "text-onSurfaceMedium",
      className,
    ].join(" ")}
  >
    {children}
  </div>
)
