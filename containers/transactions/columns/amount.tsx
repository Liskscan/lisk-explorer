import { TransactionDataType } from "@moosty/lisk-service-provider"
import { Currency } from "components/ui"
import { TableQueryColsProp } from "@Types"

export const amount: TableQueryColsProp = {
  align: "right",
  value: "Amount",
  format: (tx: TransactionDataType, foreign: { filter?: any }) => {
    const { filter } = foreign
    return (
      <span
        className={[
          "text-onSurfaceLow",
          "font-medium whitespace-nowrap ",
          filter?.address && tx?.asset?.amount
            ? filter?.address === tx?.asset?.recipient?.address
              ? filter?.address === tx?.sender?.address
                ? ""
                : "bg-success"
              : "bg-error"
            : "",
          "p-2 rounded",
        ].join(" ")}
      >
        {!tx?.asset?.amount && "-"}
        <span
          className={[
            filter?.address && tx?.asset?.amount
              ? filter?.address === tx?.asset?.recipient?.address
                ? filter?.address === tx?.sender?.address
                  ? "text-onPrimary"
                  : " text-onSuccess "
                : "text-onError"
              : "text-onSurfaceDark",
            "font-medium",
          ].join(" ")}
        >
          {tx?.asset?.amount &&
            filter?.address === tx?.sender?.address &&
            filter?.address !== tx?.asset?.recipient?.address &&
            "-"}
        </span>
        {tx?.asset?.amount && (
          <Currency
            classes={{
              sign:
                filter?.address && tx?.asset?.amount
                  ? filter?.address === tx?.asset?.recipient?.address
                    ? filter?.address === tx?.sender?.address
                      ? "text-onSurfacePrimaryHigh"
                      : "text-onSuccess "
                    : "text-onError"
                  : "text-onSurfacePrimaryHigh font-medium",
              symbol:
                filter?.address && tx?.asset?.amount
                  ? filter?.address === tx?.asset?.recipient?.address
                    ? filter?.address === tx?.sender?.address
                      ? "text-onSurfacePrimaryHigh"
                      : " text-onSuccess "
                    : "text-onError"
                  : "text-onSurfaceLow",
              separator:
                filter?.address && tx?.asset?.amount
                  ? filter?.address === tx?.asset?.recipient?.address
                    ? filter?.address === tx?.sender?.address
                      ? "text-onSurfacePrimaryHigh"
                      : " text-onSuccess "
                    : "text-onError"
                  : "text-onSurfacePrimaryHigh font-medium",
              number:
                filter?.address && tx?.asset?.amount
                  ? filter?.address === tx?.asset?.recipient?.address
                    ? filter?.address === tx?.sender?.address
                      ? "text-onSurfacePrimaryMedium"
                      : " text-onSuccess "
                    : "text-onError"
                  : "text-onSurfacePrimaryMedium font-medium",
              decimals:
                filter?.address && tx?.asset?.amount
                  ? filter?.address === tx?.asset?.recipient?.address
                    ? filter?.address === tx?.sender?.address
                      ? "text-onSurfacePrimaryMedium"
                      : " text-onSuccess "
                    : "text-onError"
                  : "text-onSurfacePrimaryMedium ",
            }}
            beddows={tx?.asset?.amount}
          />
        )}
      </span>
    )
  },
}
