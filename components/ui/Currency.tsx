import { FC } from "react"
import { useDecimals } from "providers/CurrencyProvider"
import { CurrencyProps } from "@Types"

export const Currency: FC<CurrencyProps> = ({
  beddows,
  convert,
  forceDecimals,
  classes,
}) => {
  const { parseBeddows } = useDecimals()
  const { number, decimals } = parseBeddows(beddows, convert, forceDecimals)

  return (
    <span className={"whitespace-nowrap "}>
      {number && (
        <span
          className={[
            classes?.number
              ? classes?.number
              : "text-onSurfacePrimaryHigh font-medium",
          ].join(" ")}
        >
          {number}
        </span>
      )}
      {decimals && (
        <span
          className={[
            classes?.separator
              ? classes?.separator
              : "text-onSurfacePrimaryMedium",
          ].join(" ")}
        />
      )}
      {decimals && (
        <span
          className={[
            classes?.decimals
              ? classes?.decimals
              : "text-onSurfacePrimaryMedium",
          ].join(" ")}
        >
          {decimals}
        </span>
      )}
      {process.env.NEXT_PUBLIC_SYMBOL && (
        <span
          className={[
            "ml-0.5",
            classes?.symbol ? classes?.symbol : "text-onSurfaceLow font-medium",
          ].join(" ")}
        >
          {process.env.NEXT_PUBLIC_SYMBOL}
        </span>
      )}
    </span>
  )
}
