import { FC } from "react"
import { TableHeadCols } from "@Types"

export const HeadColumn: FC<TableHeadCols> = ({
  style = {},
  align = "left",
  bg = "bg-surface-1",
  text = "text-onSurfaceHigh",
  bold = false,
  className,
  value,
}) => (
  <th
    style={style}
    className={[
      "sticky top-0 px-6 py-3 ",
      "p-4",
      "table-cell",
      bg,
      text,
      bold ? `font-black` : "font-medium font-normal",
      `text-${align}`,
      className,
    ].join(" ")}
  >
    {value}
  </th>
)
