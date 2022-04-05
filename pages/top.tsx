import { AccountDataType } from "@moosty/lisk-service-provider"
import { Avatar, Link } from "components/ui"
import { Currency } from "components/ui/Currency"
import { fetchSSR } from "hooks/fetch"
import { BlockEnvelope } from "@Types"
import { Meta } from "components/data/Meta"
import { DataTable } from "@Components"
import { compactString } from "../utils/format"

export const Top = ({ accountsSSR }: { accountsSSR: AccountDataType[] }) => (
  <>
    <Meta title={"Top accounts"} />
    <div className="w-full md:w-app max-w-app mx-auto space-y-4 flex flex-col items-center  bg-background text-base">
      <div className="mx-auto w-full w-full">
        <DataTable
          staticTable
          ssr={accountsSSR}
          stickyHeader={true}
          className="w-full"
          method={"get.accounts"}
          oddClassName="bg-background text-onBackground"
          evenClassName="bg-background text-onBackground"
          hoverClassName="hover:bg-surface-3"
          cols={[
            {
              style: { width: 30 },
              value: "#",
              format: (row, dummy, n: number) => (
                <div className="text-onSurfaceMedium">{n + 1}</div>
              ),
            },
            {
              value: "Address",
              width: "120px",
              format: (account: AccountDataType) => (
                <Link
                  href={`/account/[[...slug]]`}
                  link={`/account/${account.summary.address}`}
                  color={"onSurfaceLinkHigh"}
                >
                  <span className="flex flex-row ">
                    <Avatar
                      className="mr-2"
                      address={account.summary.address}
                      size={20}
                    />
                    <span className="hidden md:flex">
                      {account.knowledge?.owner ||
                        account.summary.username ||
                        account.summary.address}
                    </span>
                    <span className="md:hidden">
                      {account.knowledge?.owner ||
                        account.summary.username ||
                        compactString(account.summary.address, 20)}
                    </span>
                  </span>
                </Link>
              ),
            },
            {
              align: "center",
              value: "Description",
              format: (account: AccountDataType) => {
                return (
                  <div className="text-onSurfaceMedium">
                    {account.knowledge?.description}
                  </div>
                )
              },
            },
            {
              align: "right",
              value: "Balance",
              width: "20%",

              format: (account: AccountDataType) => {
                return (
                  <div className=" font-medium text-right items-center text-onSurfaceDark bg-surfaceDark rounded px-2 py-1">
                    <Currency
                      beddows={account.summary.balance || account.token.balance}
                      forceDecimals={0}
                    />
                  </div>
                )
              },
            },
          ]}
          params={{
            sort: "balance:desc",
            limit: 100,
          }}
        />
      </div>
    </div>
  </>
)

export const getStaticProps = async () => {
  const { data } = (await fetchSSR("accounts", {
    limit: parseInt(process.env.NEXT_PUBLIC_PAGES_TOP_LIMIT!),
    sort: "balance:desc",
  })) as BlockEnvelope
  if (data) {
    return {
      props: {
        accountsSSR: data,
      },
      revalidate: 60 * 5,
    }
  }
  return {
    notFound: true,
  }
}

export default Top
