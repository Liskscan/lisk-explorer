import { FC } from "react"
import { HotKey } from "./HotKey"

export const Combo: FC<{ label: string; keys: string[] }> = ({
  keys,
  label,
}) => (
  <div className="flex flex-col space-y-2">
    <h2 className={"font-medium text-onSurfaceHigh"}>{label}</h2>
    <div className="flex flex-row space-x-2 items-center w-full group">
      {keys
        .map((key, i) => {
          const elements = []
          if (i > 0) {
            elements.push(
              <span
                key={`${i}-${key}-key`}
                className="text-center font-medium text-onSurfaceLow"
              >
                +
              </span>,
            )
          }
          elements.push(<HotKey key={`key-${key}-${i}`} hotKey={key} />)
          return elements
        })
        .flat()}
    </div>
  </div>
)
