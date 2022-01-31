import { FC, useEffect, useState } from "react"
import { Pagination, Paper } from "components/ui"
import { useWatchAccount } from "@moosty/use-accounts"
import { parseLiskScanData } from "containers/delegates/utils"
import {
  AccountDataType,
  BlockDataType,
  TransactionDataType,
  useLiskService,
} from "@moosty/lisk-service-provider"
import copy from "copy-to-clipboard"
import { useRouter } from "next/router"
import {
  AccountEnvelope,
  DelegateAccountData,
  TransactionEnvelope,
} from "@Types"
import { fetchMetaSSR, fetchSSR } from "hooks/fetch"
import { Meta } from "components/data/Meta"
import { CopyHotKey } from "containers"
import { Transactions } from "@Components"
import {
  AccountDetails,
  AccountHeader,
  AccountMobileFilter,
  DelegateContainer,
  Unlocking,
  VoteContainer,
} from "containers/account"

export const Account: FC<{
  accountSSR: AccountDataType
  sendCount?: number | null
  receivedCount?: number | null
  lastBlock?: BlockDataType | null
  votes?: any[] | null
  votesTotal?: number | null
  transactionsSSR?: TransactionDataType[]
  pagesSSR?: number
}> = ({
  accountSSR,
  sendCount,
  receivedCount,
  lastBlock,
  votes,
  votesTotal,
  transactionsSSR,
  pagesSSR,
}) => {
  const router = useRouter()
  const [publicKeyOrAddress, page] = router.query.slug || []
  const { serviceClient } = useLiskService()
  const { account, setAccount } = useWatchAccount(accountSSR)
  const [pages, setPages] = useState<number>(pagesSSR || 0)
  const [tab, setTab] = useState<
    "votes" | "delegate" | "info" | "transactions"
  >("info")

  useEffect(
    () => console.log(`Account ${publicKeyOrAddress}`, account),
    [account],
  )

  useEffect(() => {
    if (publicKeyOrAddress) {
      setAccount(publicKeyOrAddress)
    }
  }, [publicKeyOrAddress, serviceClient])

  useEffect(() => {
    const getPages = async () => {
      const { meta } = (await serviceClient?.get("get.transactions", {
        limit: 1,
        address: account.summary.address,
      })) as TransactionEnvelope
      setPages(meta?.total || 0)
    }
    if (serviceClient && account) {
      getPages()
    }
  }, [account, serviceClient])

  return (
    <>
      <Meta
        title={`${
          account?.summary?.username
            ? `${account?.summary?.username
                .charAt(0)
                .toUpperCase()}${account?.summary?.username.slice(1)}`
            : account?.summary?.address
        } ${account?.summary?.isDelegate ? "delegate account" : "account"}`}
      />
      <div
        key={publicKeyOrAddress}
        className="flex flex-col space-y-4 p-1 md:p-0"
      >
        <CopyHotKey
          message={"Link copied"}
          hotkey={"c+l"}
          action={() =>
            account?.summary?.address &&
            copy(
              `${window.location.protocol}//${window.location.host}/account/${account?.summary?.address}`,
            )
          }
          deps={[account]}
        />
        <AccountHeader account={account as DelegateAccountData} />
        <AccountMobileFilter
          isDelegate={account?.summary?.isDelegate}
          setTab={setTab}
          tab={tab}
        />
        {!account && (
          <Paper
            surface={1}
            shadow={2}
            className={"flex w-app max-w-app mx-auto p-10"}
          >
            Loading account...
          </Paper>
        )}
        {account && (
          <div
            className={[
              tab === "info" ? "flex" : "hidden",
              "md:flex md:mx-auto md:w-app md:max-w-app flex-col md:flex-row mx-4 md:space-x-4 flex-col-reverse",
            ].join(" ")}
          >
            <AccountDetails
              account={account}
              send={sendCount}
              received={receivedCount}
              lastBlockSSR={lastBlock}
            />
          </div>
        )}
        {account && account?.summary?.isDelegate && (
          <div
            className={[tab === "delegate" ? "block" : "md:block hidden"].join(
              " ",
            )}
          >
            <DelegateContainer
              delegate={parseLiskScanData(account as DelegateAccountData)}
            />
          </div>
        )}
        {account && account?.dpos?.unlocking && (
          <div
            className={[tab === "votes" ? "block" : "md:block hidden"].join(
              " ",
            )}
          >
            <Unlocking account={account} />
          </div>
        )}
        {account && (
          <>
            <div
              className={[
                tab === "votes" ? "flex" : "md:flex hidden",
                "md:flex flex-col mx-auto w-full w-app max-w-app",
              ].join(" ")}
            >
              <VoteContainer
                account={account}
                votes={votes}
                votesTotal={votesTotal}
              />
            </div>
            <div
              className={[
                tab === "transactions" ? "block" : "md:block hidden",
                "w-app mx-auto max-w-app",
              ].join(" ")}
            >
              {transactionsSSR && (
                <Transactions
                  headClassName="bg-surface-4"
                  oddClassName="bg-background"
                  evenClassName="bg-background"
                  hoverClassName="hover:bg-surface-3"
                  key={`${publicKeyOrAddress}-txs`}
                  limit={parseInt(
                    process.env.NEXT_PUBLIC_PAGES_ACCOUNT_TRANSACTION_LIMIT!,
                  )}
                  fallback={transactionsSSR}
                  offset={
                    parseInt(page || "0") *
                    parseInt(
                      process.env.NEXT_PUBLIC_PAGES_ACCOUNT_TRANSACTION_LIMIT!,
                    )
                  }
                  filter={{ address: account?.summary?.address }}
                />
              )}
              <Pagination
                href={"/account/[[...slug]]"}
                siblingCount={3}
                page={parseInt(page || "0")}
                items={Math.ceil(
                  pages /
                    parseInt(
                      process.env.NEXT_PUBLIC_PAGES_ACCOUNT_TRANSACTION_LIMIT!,
                    ),
                )}
                location={`/account/${publicKeyOrAddress}`}
              />
            </div>
          </>
        )}
      </div>
    </>
  )
}

export const getServerSideProps = async (context: any) => {
  const [identifier] = context.params.slug || []
  const query: { address?: string; publicKey?: string } = {}
  if (identifier.substr(0, 3) === "lsk") {
    query.address = identifier
  } else {
    query.publicKey = identifier
  }
  const { data } = (await fetchSSR("accounts", {
    limit: 1,
    ...query,
  })) as AccountEnvelope
  if (data) {
    const requestList: { method: string; params: any; handle: string }[] = [
      {
        method: "transactions",
        params: { limit: 1, senderAddress: data?.[0]?.summary?.address },
        handle: "send",
      },
      {
        method: "transactions",
        params: { limit: 1, recipientAddress: data?.[0]?.summary?.address },
        handle: "received",
      },
      {
        method: "transactions",
        params: {
          limit: parseInt(
            process.env.NEXT_PUBLIC_PAGES_ACCOUNT_TRANSACTION_LIMIT!,
          ),
          address: data?.[0]?.summary?.address,
        },
        handle: "transactions",
      },
    ]
    data?.[0]?.summary?.username &&
      requestList.push({
        method: "blocks",
        params: {
          limit: 1,
          sort: "height:desc",
          generatorPublicKey: data?.[0]?.summary?.publicKey,
        },
        handle: "lastBlock",
      })
    data?.[0]?.summary?.username &&
      requestList.push({
        method: "votes_received",
        params: {
          limit: 10,
          username: data?.[0]?.summary?.username,
          aggregate: true,
        },
        handle: "votes",
      })
    const requests = await fetchMetaSSR(requestList)
    return {
      props: {
        accountSSR: data?.[0] || null,
        sendCount: requests?.send?.meta?.total || null,
        receivedCount: requests?.received?.meta?.total || null,
        lastBlock: requests?.lastBlock?.data?.[0] || null,
        votes: requests?.votes?.data?.votes || null,
        votesTotal: requests?.votes?.meta?.total || null,
        transactionsSSR: requests?.transactions?.data || null,
        pagesSSR: requests?.transactions?.meta?.total || null,
      },
    }
  }
  return {
    notFound: true,
  }
}

export default Account
