import { FC } from "react"
import { Avatar } from "components/ui"
import { BalanceBlock } from "./BalanceBlock"
import { calculateTotalBalance, calculateVotes } from "utils/parsers"
import { compactString } from "utils/format"
import { AccountDataType } from "@moosty/lisk-service-provider"

export const AccountHeader: FC<{
  account: AccountDataType
}> = ({ account }) => {
  const totalBalance =
    BigInt(calculateTotalBalance(account)) +
    BigInt(calculateVotes(account?.dpos?.unlocking))
  return (
    <div
      className={
        "w-app mx-auto md:max-w-app bg-transparant rounded md:grid grid-flow-col grid-cols-2 gap-2  text-sm"
      }
    >
      <div
        className={"flex flex-row text-onBackgroundHigh items-center sm:block"}
      >
        <div className={"flex flex-row items-center"}>
          <Avatar
            className={"m-3"}
            address={account?.summary?.address || ""}
            size={43}
          />
          <div className="flex flex-col">
            {account?.dpos?.delegate?.username || account?.knowledge?.owner ? (
              <span className={"flex flex-col"}>
                <span className="flex-row text-base md:text-xl text-onBackgroundHigh font-medium capitalize">
                  {account?.dpos?.delegate?.rank && (
                    <span className="">{account?.dpos?.delegate?.rank}. </span>
                  )}
                  {account?.dpos?.delegate?.username ||
                    account?.knowledge?.owner}
                </span>
              </span>
            ) : (
              <>
                <span className="text-base font-medium block text-onBackground ">
                  {compactString(account?.summary?.address, 30)}
                </span>
              </>
            )}
            <div className={"flex flex-row space-x-2"}>
              {account?.summary?.username ? (
                <span
                  className={
                    "text-sm rounded -ml-0.5 px-2 py-1 mx-auto bg-surface-4 text-onSurfaceHigh font-medium"
                  }
                >
                  Delegate Account
                </span>
              ) : (
                <span
                  className={
                    "text-sm rounded -ml-0.5 px-2 py-1 mx-auto bg-surface-2 text-onSurfaceHigh font-medium"
                  }
                >
                  Regular Account
                </span>
              )}
              {account?.knowledge?.description && (
                <span
                  className={
                    "text-sm rounded -ml-0.5 px-2 py-1 mx-auto bg-surface-2 text-onSurfaceHigh font-medium"
                  }
                >
                  {account?.knowledge?.description}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-2" />
      <BalanceBlock
        title={"Total Balance"}
        amount={(
          BigInt(calculateTotalBalance(account)) +
          BigInt(calculateVotes(account?.dpos?.unlocking))
        ).toString()}
        total={totalBalance.toString()}
        colorTitle={"text-onInfobar"}
        colorBg={"bg-primary"}
        colorText={"text-onPrimaryHigh"}
        noPercentage
      />
      <BalanceBlock
        title={"Total Available"}
        amount={account?.summary?.balance}
        total={totalBalance.toString()}
        colorTitle={"text-onInfobar"}
        colorBg={"bg-success"}
        colorText={"text-onSuccess"}
      />
      {account?.dpos?.unlocking && (
        <BalanceBlock
          title={"Total Unlocking"}
          amount={calculateVotes(account?.dpos?.unlocking) as string}
          total={totalBalance.toString()}
          colorTitle={"text-onInfobar"}
          colorBg={"bg-warning"}
          colorText={"text-onWarning"}
        />
      )}
      {calculateVotes(account?.dpos?.sentVotes, true) > 0 && (
        <BalanceBlock
          title={"Total Locked"}
          amount={calculateVotes(account?.dpos?.sentVotes) as string}
          total={totalBalance.toString()}
          colorTitle={"text-onInfobar"}
          colorBg={"bg-error"}
          colorText={"text-onError"}
        />
      )}
    </div>
  )
}
