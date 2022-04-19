import { FC, useEffect, useRef, useState } from "react"
import { Table } from "components/data/table"
import { TableColsProp } from "@Types"
import { useSearch } from "hooks/Search"
import { useHotkeys } from "react-hotkeys-hook"
import { useRouter } from "next/router"
import { Link } from "components/ui/Link"
import { format } from "utils"

export const Search: FC<{ closeFunction?: any }> = ({ closeFunction }) => {
  const searchField = useRef(null)
  const router = useRouter()
  const [searchInput, setSearchInput] = useState<string>("")
  const { results, setSearch, searching, quickResult } = useSearch()
  const [hide, setHide] = useState<boolean>()
  useHotkeys("/", () => {
    if (searchField?.current) {
      // @ts-ignore
      searchField.current.focus()
      setSearchInput("")
    }
  })

  useEffect(() => {
    if (searchInput && searchInput.length > 2) {
      setSearch(searchInput)
    } else {
      setSearch("")
    }
  }, [searchInput])

  const tryQuickResult = () => {
    if (!results?.quickResult?.error && results?.quickResult?.type) {
      switch (results?.quickResult?.type) {
        case "block":
          setHide(true)
          router.push(`/block/${results.quickResult.id}`)
          break
        case "account":
          setHide(true)
          router.push(`/account/${results.quickResult.id}`)
          break
        case "transaction":
          setHide(true)
          router.push(`/transaction/${results.quickResult.id}`)
          break
        default:
          break
      }
    }
    if (
      results?.results?.[0]?.type &&
      results?.results?.[0]?.id &&
      !results?.quickResult?.id
    ) {
      router.push(`/${results.results[0].type}/${results.results[0].id}`)
    }
  }
  return (
    <div className="rounded bg-surface-1 text-onSurfacePrimaryLow flex-1 flex  lg:ml-6 lg:justify-end flex-col">
      <div className=" w-full ">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative ">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-onSurfaceDark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            ref={searchField}
            id="search"
            name="search"
            className={[
              "block w-full pl-10 pr-3 py-2 border border-transparent rounded-md text-base",
              "leading-5 bg-surface-1 text-onSurfaceLow placeholder-onSurfaceLow focus:outline-none",
              "focus:bg-surface-1 focus:border-surface-2 focus:ring-surface-3",
              "focus:text-onSurfaceLight",
            ].join(" ")}
            type="search"
            onBlur={() => setTimeout(() => setHide(true), 300)}
            onFocus={() => setHide(false)}
            onChange={(e) =>
              e.target.value !== "/" && setSearchInput(e.target.value)
            }
            onKeyDown={(e) => {
              setHide(false)
              if (e.key === "Enter") {
                setTimeout(() => {
                  tryQuickResult()
                  closeFunction !== null && closeFunction()
                }, 600)
              }
            }}
            autoComplete="off"
            value={searchInput}
            placeholder="Search for address/tx/delegate/block"
          />

          <div
            className={[
              "absolute inset-y-0 right-10 top-2 flex",
              "items-center pointer-events-none",
              "searchSpinner ease-linear rounded-full",
              "border-2 border-t-2 border-t-white",
              "border-surface h-5 w-5",
              !searching && "hidden",
            ].join(" ")}
          />
        </div>
      </div>
      <div className="w-full">
        {!hide &&
          searchInput?.length > 2 &&
          quickResult &&
          results?.results?.length === 0 && (
            <div className="absolute w-full md:w-auto rounded bg-background text-onSurfaceLinkMedium z-50">
              <Table
                cols={[
                  {
                    value: quickResult.type?.toUpperCase(),
                    bg: "bg-background",
                    text: "text-onBackgroundMedium",
                    className: "",
                  },
                ]}
                rows={[
                  {
                    id: quickResult.id,
                    cols: [
                      {
                        value: (
                          <Link
                            className={
                              "flex flex-col cursor-pointer bg-background"
                            }
                            href={`/${quickResult.type}/${quickResult.id}`}
                            link={`/${quickResult.type}/${quickResult.id}`}
                          >
                            <span className="hidden md:block bg-background">
                              {quickResult.id}
                            </span>
                            <span className="md:hidden block bg-background">
                              {format.compactString(quickResult.id, 30)}
                            </span>
                          </Link>
                        ),
                      },
                    ],
                  } as TableColsProp,
                ]}
              />
            </div>
          )}
        {!hide &&
          searchInput?.length > 2 &&
          results &&
          results?.results?.length > 0 && (
            <div className="absolute w-full md:w-auto z-40">
              <Table
                className="rounded shadow-1"
                evenClassName="bg-surface-1 text-onSurfaceLinkMedium"
                oddClassName="bg-background text-onSurfaceLinkMedium"
                cols={[
                  {
                    bg: "bg-background",
                    text: "",
                    value: "",
                  },
                ]}
                rows={results?.results}
              />
            </div>
          )}
      </div>
    </div>
  )
}
