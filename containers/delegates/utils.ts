import { DelegateAccountData } from "@Types"

export const getSelfVote = (
  sentVotes: { delegateAddress?: string; amount?: string }[],
  address: string,
): string => {
  return sentVotes
    ?.filter((sv) => sv.delegateAddress === address)
    ?.reduce((acc, cur) => BigInt(acc) + BigInt(cur?.amount || 0), BigInt(0))
    ?.toString()
}

export const calculateNeededSelfVote = (
  selfVote: string,
  receivedVotes: string,
): string => {
  const need = BigInt(
    Math.ceil(
      parseInt(BigInt((BigInt(receivedVotes) * 100n) / BigInt(10)).toString()) /
        100,
    ),
  )
  return BigInt(selfVote) < need && need - BigInt(selfVote) >= BigInt(10)
    ? calculateNeededSelfVote(
        need.toString(),
        (BigInt(receivedVotes) + need - BigInt(selfVote)).toString(),
      )
    : (
        Math.ceil(parseInt(((100n * need) / BigInt(10)).toString()) / 100) * 10
      ).toString()
}

export const parseLiskScanData = (
  delegate: DelegateAccountData,
): DelegateAccountData => {
  const selfVote = delegate?.dpos?.sentVotes
    ? getSelfVote(delegate?.dpos?.sentVotes, delegate?.summary?.address)
    : "0"
  const maxVoteWeight = (BigInt(selfVote) * BigInt(10)).toString()
  const neededSelfVote =
    delegate?.dpos?.delegate?.totalVotesReceived && BigInt(selfVote) > BigInt(0)
      ? calculateNeededSelfVote(
          selfVote,
          BigInt(delegate?.dpos?.delegate?.totalVotesReceived).toString(),
        )
      : "0"
  const missingSelfVote =
    BigInt(neededSelfVote) > BigInt(0)
      ? (BigInt(neededSelfVote) - BigInt(selfVote)).toString()
      : "0"
  const capacity =
    delegate?.dpos?.delegate?.totalVotesReceived &&
    BigInt(maxVoteWeight) > BigInt(0)
      ? (
          Number(
            ((BigInt(delegate?.dpos?.delegate?.totalVotesReceived) * 100n) /
              BigInt(maxVoteWeight)) *
              BigInt(100),
          ) / 100
        ).toString()
      : "0"
  const voteWeight =
    delegate?.dpos?.delegate?.totalVotesReceived &&
    BigInt(delegate?.dpos?.delegate?.totalVotesReceived) > BigInt(maxVoteWeight)
      ? maxVoteWeight
      : delegate?.dpos?.delegate?.totalVotesReceived
      ? delegate?.dpos?.delegate?.totalVotesReceived
      : "0"
  const overWeight =
    delegate?.dpos?.delegate?.totalVotesReceived &&
    BigInt(delegate?.dpos?.delegate?.totalVotesReceived) > BigInt(maxVoteWeight)
      ? (
          BigInt(delegate?.dpos?.delegate?.totalVotesReceived) -
          BigInt(maxVoteWeight)
        ).toString()
      : "0"
  return {
    ...delegate,
    liskScan: {
      rank: 0,
      selfVote,
      maxVoteWeight,
      missingSelfVote,
      neededSelfVote,
      capacity,
      voteWeight,
      overWeight,
      nextForgingTime: 0,
    },
  }
}
