import { FC } from "react"
import { Currency } from "components/ui"

export const BalanceBlock: FC<{
  title: string
  amount?: string
  total: string
  colorTitle: string
  colorBg: string
  colorText: string
  noPercentage?: boolean
}> = ({
  title,
  amount,
  total,
  colorBg,
  colorText,
  colorTitle,
  noPercentage = false,
}) => {
  return (
    <div
      className={[
        `w-full flex flex-col items-center p-2 px-4`,
        `font-medium my-2 rounded mx-auto text-base`,
        `${colorBg} ${colorText}`,
      ].join(" ")}
    >
      <span className={colorTitle}>{title}</span>
      <div className="flex flex-row items-center space-x-2">
        <Currency
          classes={{
            sign: `${colorText} font-medium`,
            symbol: `${colorText} font-medium`,
            separator: `${colorText}`,
            number: `${colorText} font-medium`,
            decimals: `${colorText}`,
          }}
          beddows={amount || "0"}
        />
        {!noPercentage && (
          <span>
            {amount && parseInt(amount) > 0
              ? parseInt(
                  ((BigInt(amount) * 10000n) / BigInt(total)).toString(),
                ) / 100
              : 0}
            %
          </span>
        )}
      </div>
    </div>
  )
}
