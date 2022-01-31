import { FC, useEffect, useState } from "react"
import { Pagination } from "components/ui"
import {
  Envelope,
  TransactionDataType,
  useLiskService,
} from "@moosty/lisk-service-provider"
import { useRouter } from "next/router"
import { NetworkStatusDataType } from "@moosty/lisk-connection-provider"
import { FilterButtons } from "@Components"
import { Transactions as TransactionsWidget } from "components/widgets"

export const TransactionsTableContainer: FC<{
  limit: number
  itemCount: number
  fallback: TransactionDataType[]
  status: NetworkStatusDataType
}> = ({ limit, itemCount, fallback, status }) => {
  const router = useRouter()
  const [filter, page] = router.query.slug || ["all", "0"]
  const { serviceClient } = useLiskService()
  const [items, setItems] = useState<number>(itemCount || 0)

  const updateStatus = (state: string) => {
    router.push(`/transactions/${state}`)
  }

  const parseFilter = () =>
    filter && filter !== "all" ? { moduleAssetId: filter } : {}

  useEffect(() => setItems(itemCount), [itemCount])

  useEffect(() => {
    const getTxs = async () => {
      const { meta } = (await serviceClient?.get("get.transactions", {
        limit: 1,
        ...parseFilter(),
      })) as Envelope
      setItems(Math.ceil((meta?.total || 0) / limit))
    }
    if (serviceClient) {
      getTxs()
    }
  }, [serviceClient, filter])

  const parseButtonList = () => {
    const mapAssets = ({ id, name }: { id: string; name: string }) => ({
      label: name.split(":")[1],
      state: id,
    })
    return [
      {
        label: `All Txs`,
        state: "all",
      },
      ...(status?.moduleAssets ? status?.moduleAssets?.map(mapAssets) : []),
    ]
  }

  return (
    <>
      <div className="w-full md:w-app md:max-w-app mx-auto">
        {status && (
          <FilterButtons
            className="md:flex md:flex-row md:flex-wrap"
            buttons={parseButtonList()}
            defaultState={"all"}
            selection={filter || "all"}
            onChange={updateStatus}
          />
        )}
      </div>
      <TransactionsWidget
        fallback={fallback}
        filter={parseFilter()}
        hoverClassName="hover:bg-surface-3"
        limit={limit}
        className="w-full md:w-app max-w-app mx-auto text-onSurfaceHigh"
        offset={parseInt(page || "0") * limit}
      />
      <Pagination
        siblingCount={3}
        page={parseInt(page || "0")}
        items={items}
        href={"/transactions/[[...slug]]"}
        location={`/transactions${
          parseFilter()?.moduleAssetId ? `/${filter}` : "/all"
        }`}
      />
    </>
  )
}
