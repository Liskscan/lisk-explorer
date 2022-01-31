import { FC } from "react"
import { TableCols } from "@Types"

export const Column: FC<TableCols> = ({
  style = {},
  align = "left",
  bg = "surface",
  text = "onSurface",
  weight = "normal",
  value,
}) => (
  <td
    style={style}
    className={[
      "border-surfaceDark",
      "table-cell",
      "tableColumn",
      "p-4",
      bg ? `bg-${bg}` : "",
      text ? `text-${text}` : "",
      `font-${weight}`,
      `text-${align}`,
    ].join(" ")}
  >
    {value}
  </td>
)
