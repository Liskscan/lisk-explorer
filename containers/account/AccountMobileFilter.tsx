import { FC } from "react"

export const AccountMobileFilter: FC<{
  tab: "votes" | "delegate" | "info" | "transactions"
  setTab: any
  isDelegate?: boolean
}> = ({ tab, setTab, isDelegate }) => {
  return (
    <div className=" tabs md:hidden grid grid-cols-3 grid-flow-col gap-1 mt-2 mx-4">
      <span
        onClick={() => setTab("info")}
        className={[
          tab === "info" ? "bg-surface-4 text-onSurfaceMedium" : "bg-background",
          "text-center font-medium text-onBackgroundMedium px-2 py-2 rounded",
        ].join(" ")}
      >
        Account
      </span>
      {isDelegate &&
      <span
        onClick={() => setTab("delegate")}
        className={[
          tab === "delegate" ? "bg-surface-4 text-onSurfaceMedium" : "bg-background",
          "text-center font-medium text-onBackgroundMedium px-2 py-2 rounded",
        ].join(" ")}
      >
        Delegate
      </span>}
      <span
        onClick={() => setTab("votes")}
        className={[
          tab === "votes" ? "bg-surface-4 text-onSurfaceMedium" : "bg-background",
          "text-center font-medium text-onBackgroundMedium px-2 py-2 rounded",
        ].join(" ")}
      >
        Votes
      </span>
      <span
        onClick={() => setTab("transactions")}
        className={[
          tab === "transactions" ? "bg-surface-4 text-onSurfaceMedium" : "bg-background",
          "text-center font-medium text-onBackgroundMedium px-2 py-2 rounded",].join(" ")}
      >
        Txs
      </span>
    </div>
  )
}
