import { useState } from "react"
import { useServiceEvents } from "@moosty/lisk-service-events"
import { useHotkeys } from "react-hotkeys-hook"
import { useDecimals } from "providers/CurrencyProvider"

export const BlockHeight = () => {
  const { formatNumber } = useDecimals()
  const { status, block } = useServiceEvents()
  const [type, setType] = useState<"height" | "finalizedHeight">("height")
  const switchType = () => {
    type !== "height" ? setType("height") : setType("finalizedHeight")
  }
  useHotkeys("y", switchType)

  return (
    <div className="font-medium whitespace-nowrap">
      <span className={"cursor-pointer select-none"} onClick={switchType}>
        {type === "height" ? `Block height:` : `Finalized Height`}
      </span>
      &nbsp;
      <span className="simple-animation font-bold" key={status?.[type]}>
        {status?.[type]
          ? formatNumber(status?.[type]?.toString())
          : type === "height"
          ? formatNumber(block?.height?.toString())
          : "Loading.."}
      </span>
    </div>
  )
}
export default BlockHeight
