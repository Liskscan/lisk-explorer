import { useDebounce } from "hooks/Debounce"
import { useEffect, useState } from "react"
import { SearchResults, TableColsProp } from "@Types"
import {
  AccountDataType,
  BlockDataType,
  Envelope,
  TransactionDataType,
  useLiskService,
} from "@moosty/lisk-service-provider"
import { format, lisk } from "utils"
import { Avatar } from "components/ui/Avatar"
import { useRouter } from "next/router"
import { Link } from "components"

export const useSearch = () => {
  const { serviceClient } = useLiskService()
  const router = useRouter()
  const [searchValue, setSearch] = useDebounce("", 140)
  const [searching, setSearching] = useState<boolean | string>(false)
  const [results, setResults] = useState<SearchResults>({} as SearchResults)
  const [queryResults, setQueryResults] = useState<any[]>()
  useEffect(() => {
    const findPublicKey = async (publicKey: string) => {
      const accountData = (await serviceClient?.get("get.accounts", {
        publicKey,
      })) as { data?: AccountDataType[] }
      if (accountData?.data && accountData.data.length > 0) {
        return {
          type: "account",
          id: accountData.data[0].summary.address,
          data: accountData.data[0],
        }
      }
      const blockData = (await serviceClient?.get("get.blocks", {
        blockId: publicKey,
      })) as { data?: BlockDataType[] }
      if (blockData.data && blockData.data.length > 0) {
        return {
          type: "block",
          id: publicKey,
          data: blockData.data[0],
        }
      }
      const transactionData = (await serviceClient?.get("get.transactions", {
        transactionId: publicKey,
      })) as { data?: BlockDataType[] }
      if (transactionData.data && transactionData.data.length > 0) {
        return {
          type: "transaction",
          id: publicKey,
          data: transactionData.data[0],
        }
      }
      return {
        error: true,
      }
    }
    const findUsername = async (username: string) => {
      const accountData = (await serviceClient?.get("get.accounts", {
        username,
      })) as { data?: AccountDataType[] }
      if (accountData?.data && accountData.data.length > 0) {
        return {
          type: "account",
          id: accountData.data[0].summary.address,
          data: accountData.data[0],
        }
      }
      return {
        error: true,
      }
    }
    const quickInspectSearchValue = async () => {
      const inputLength = searchValue.length
      if (inputLength === 64) {
        setResults({
          ...results,
          quickResult: {
            type: "publicKey",
            ...(await findPublicKey(searchValue)),
          },
        })
        return
      }
      if (inputLength === 40) {
        setResults({
          ...results,
          quickResult: {
            type: "account",
            id: lisk.getLisk32AddressFromAddress(
              Buffer.from(searchValue, "hex"),
            ),
          },
        })
        return
      }
      if (inputLength === 41 && searchValue.substr(0, 3) === "lsk") {
        setResults({
          ...results,
          quickResult: {
            type: "account",
            id: searchValue,
          },
        })
        return
      }
      if (
        inputLength <= 20 &&
        parseInt(searchValue).toString() === searchValue
      ) {
        setResults({
          ...results,
          quickResult: {
            type: "block",
            id: searchValue,
          },
        })
      }
      // if (
      //   inputLength <= 20 &&
      //   parseInt(searchValue).toString() !== searchValue
      // ) {
      //   const username = await findUsername(searchValue)
      //   if (!username.error) {
      //     setResults({
      //       ...results,
      //       quickResult: {
      //         type: "username",
      //         ...username,
      //       },
      //     })
      //   }
      // }

      // setResults({ ...results, quickResult: {} })
    }
    const doSearch = async (value: string) => {
      const results = {
        accounts:
          ((
            (await serviceClient?.get("get.accounts", {
              search: value,
            })) as Envelope
          )?.data as AccountDataType[]) || ([] as AccountDataType[]),
        transactions:
          ((
            (await serviceClient?.get("get.transactions", {
              search: value,
              limit: 3,
            })) as Envelope
          )?.data as TransactionDataType[]) || ([] as TransactionDataType[]),
        blocks:
          value.length > 10
            ? ((
                (await serviceClient?.get("get.blocks", {
                  blockId: value,
                })) as Envelope
              )?.data as BlockDataType[])
            : [],
      } as {
        accounts: AccountDataType[]
        transactions: TransactionDataType[]
        blocks: BlockDataType[]
      }
      if (value.length > 10) {
        const accounts = (
          (await serviceClient?.get("get.accounts", {
            address: value,
            limit: 5,
          })) as Envelope
        )?.data
        if (accounts) {
          results.accounts = [
            ...(accounts as AccountDataType[]),
            ...results.accounts,
          ]
        }
        if (value.length === 64) {
          const accounts = (
            (await serviceClient?.get("get.accounts", {
              publicKey: value,
              limit: 1,
            })) as Envelope
          )?.data
          if (accounts) {
            results.accounts = [
              ...(accounts as AccountDataType[]),
              ...results.accounts,
            ]
          }
        }
        const transactions = (
          (await serviceClient?.get("get.transactions", {
            transactionId: value,
            limit: 1,
          })) as Envelope
        )?.data
        results.transactions.concat(transactions as TransactionDataType[])
      }
      return Object.keys(results)
        .map(
          (endpoint) =>
            // @ts-ignore
            results?.[endpoint]?.length > 0 && {
              type: endpoint,
              // @ts-ignore
              data: results[endpoint],
            },
        )
        .filter((e) => e)
        .flat()
    }
    if (searchValue) {
      const getResults = async () => {
        setSearching(searchValue)
        await quickInspectSearchValue()
        const resultData = await doSearch(searchValue)
        setQueryResults(resultData)
      }
      getResults()
    }
  }, [searchValue])

  useEffect(() => {
    if (queryResults) {
      const newRows: TableColsProp[] = []
      queryResults.map((category) => {
        if (category.type === "accounts") {
          category.data
            .sort((a: AccountDataType, b: AccountDataType) =>
              a?.summary?.username && b?.summary?.username
                ? a?.summary?.username?.length > b?.summary?.username?.length
                  ? 1
                  : a.summary?.username?.length < b.summary?.username?.length
                  ? -1
                  : 0
                : 0,
            )
            .map((acc: AccountDataType) => {
              newRows.push({
                id: acc.summary.address,
                type: "account",
                cols: [
                  {
                    value: (
                      <div
                        className={"flex flex-col cursor-pointer"}
                        onClick={() =>
                          router.push(`/account/${acc.summary.address}`)
                        }
                      >
                        <span className="flex flex-row space-x-4 items-center">
                          <Avatar
                            className=""
                            address={acc?.summary?.address}
                            size={25}
                          />

                          <span className="flex flex-col ">
                            <span className="font-medium text-base">
                              {acc?.summary?.username}
                            </span>
                            <span className="hidden md:block text-onSurfaceMedium">
                              {acc?.summary?.address}
                            </span>
                            <span className="block md:hidden">
                              {format.compactString(acc?.summary?.address, 40)}
                            </span>
                          </span>
                        </span>
                      </div>
                    ),
                  },
                ],
              } as TableColsProp)
            })
        }
        if (category.type === "transactions") {
          category.data.map((transaction: TransactionDataType) => {
            newRows.push({
              id: transaction.id,
              type: "transaction",
              cols: [
                {
                  value: (
                    <Link
                      href={`/transaction/[transactionId]`}
                      link={`/transaction/${transaction?.id}`}
                      className={"flex flex-col cursor-pointer"}
                    >
                      <span>{transaction?.sender.username}</span>
                      <span className="text-onSurfaceMedium">
                        {transaction?.moduleAssetName}
                      </span>
                      <span className="hidden md:block">{transaction?.id}</span>
                      <span className="md:hidden block">
                        {format.compactString(transaction?.id, 40)}
                      </span>
                    </Link>
                  ),
                },
              ],
            } as TableColsProp)
          })
        }
        if (category.type === "blocks") {
          category.data.map((block: BlockDataType) => {
            newRows.push({
              id: block.id,
              type: "block",
              cols: [
                {
                  value: (
                    <Link
                      href={`/block/[blockId]`}
                      link={`/block/${block?.id}`}
                      className={"flex flex-col cursor-pointer"}
                    >
                      <span>{block?.generatorUsername}</span>
                      <span>{block?.height}</span>
                      <span className="hidden md:block">{block?.id}</span>
                      <span className="md:hidden block">
                        {format.compactString(block?.id, 40)}
                      </span>
                    </Link>
                  ),
                },
              ],
            } as TableColsProp)
          })
        }
      })
      setResults({ ...results, results: newRows })
      searchValue === searching && setSearching(false)
    } else {
      setResults({ ...results, results: [] })
      searchValue === searching && setSearching(false)
    }
  }, [queryResults])

  return {
    results:
      searchValue && searchValue.length > 2 && !searching
        ? results
        : ({} as SearchResults),
    setSearch,
    searching,
    quickResult: results.quickResult,
  }
}
