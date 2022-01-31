import { AccountDataType } from "@moosty/lisk-service-provider"

export const calculateTotalBalance = (account: AccountDataType): string => {
  const availableBalance = BigInt(account?.summary?.balance || 0)
  return (
    availableBalance + BigInt(calculateVotes(account?.dpos?.sentVotes))
  ).toString()
}

export const calculateVotes = (
  votes?: any[],
  toNumber = false,
): string | number => {
  if (votes && votes?.length > 0) {
    const parsedVotes = votes
      ?.reduce(
        (sum: bigint, vote: { amount?: string }) =>
          sum + BigInt(vote?.amount || 0),
        BigInt(0),
      )
      ?.toString()
    return toNumber ? parseInt(parsedVotes) : parsedVotes
  }
  return toNumber ? 0 : "0"
}
