import { FC, useEffect } from "react"
import { Avatar } from "components/ui"
import Link from "next/link"
import { useWatchAccount } from "@moosty/use-accounts"
import { IncomingVotesProps } from "@Types"
import { Currency } from "components/ui/Currency"
import { AccountDataType } from "@moosty/lisk-service-provider"
import { format } from "utils"

export const IncomingVotes: FC<IncomingVotesProps> = ({
  address,
  amount,
  username,
  color = false,
  requestUsername = false,
}) => {
  const { account, setAccount } = useWatchAccount({} as AccountDataType)

  useEffect(() => {
    if (
      (!username || username.length === 0) &&
      address &&
      requestUsername &&
      !account?.summary
    ) {
      setAccount!(address)
    }
  }, [username, address, requestUsername, account, setAccount])

  return (
    <Link as={`/account/${address}`} href={`/account/[[...slug]]`}>
      <div className="w-auto rounded p-2 mb-2 cursor-pointer flex flex-row justify-between space-x-4 items-center bg-surface-2 transform duration-100 ease-in-out ">
        <Avatar address={address} size={20} />
        <span className="text-base rounded  text-onSurfaceMedium w-full  font-medium flex flex-row justify-between space-x-4 items-center ">
          <span>
            {username ||
              account?.dpos?.delegate?.username ||
              format.compactString(address, 18)}
          </span>

          <span
            className={[
              "text-center px-2 py-1 rounded whitespace-nowrap font-medium",
              color
                ? amount && BigInt(amount) > BigInt(0)
                  ? "bg-success text-onSuccess"
                  : "bg-error text-onError"
                : "",
            ].join(" ")}
          >
            {
              <Currency
                beddows={amount || "0"}
                forceDecimals={0}
                classes={{
                  sign: color
                    ? amount && BigInt(amount) > BigInt(0)
                      ? "text-onSuccess"
                      : "text-onError"
                    : "",
                  symbol: color
                    ? amount && BigInt(amount) > BigInt(0)
                      ? "text-onSuccess"
                      : "text-onError"
                    : "",
                  separator: color
                    ? amount && BigInt(amount) > BigInt(0)
                      ? "text-onSuccess"
                      : "text-onError"
                    : "",
                  number: color
                    ? amount && BigInt(amount) > BigInt(0)
                      ? "text-onSuccess"
                      : "text-onError"
                    : "",
                  decimals: color
                    ? amount && BigInt(amount) > BigInt(0)
                      ? "text-onSuccess"
                      : "text-onError"
                    : "",
                }}
              />
            }
          </span>
        </span>
      </div>
    </Link>
  )
}
