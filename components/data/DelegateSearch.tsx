import { FC, useEffect, useRef, useState } from "react"
import { AccountDataType, useLiskService } from "@moosty/lisk-service-provider"
import { useDebounce } from "hooks"

export const DelegateSearch: FC<{
  searchInput: string
  setSearchInput(e: string): void
  setResults(e: (string | undefined)[]): void
}> = ({ setSearchInput, searchInput, setResults }) => {
  const searchField = useRef(null)
  const { serviceClient } = useLiskService()
  const [suggestion, setSuggestion] = useState<(string | undefined)[]>([])
  const [searchBounced, setSearchBounce] = useDebounce("", 240)
  useEffect(() => {
    if (searchBounced && serviceClient) {
      const lookUp = async () => {
        const result = (await serviceClient.get("get.accounts", {
          search: searchBounced,
          limit: 3,
        })) as { data?: AccountDataType[] }
        if (result?.data) {
          setResults(
            result.data?.map((account) => account?.dpos?.delegate?.username),
          )
          setSuggestion(
            result.data?.map((account) => account?.dpos?.delegate?.username),
          )
        }
      }
      lookUp()
    }
  }, [searchBounced, serviceClient])

  useEffect(() => setSearchBounce(searchInput), [searchInput])

  return (
    <div className="w-app max-w-app mx-auto bg-surface-1 rounded text-onSurfacePrimaryLow">
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
            "block w-full pl-10 pr-3 py-2 border border-transparent rounded-md",
            "leading-5 bg-surface-1 text-onSurfaceLow placeholder-onSurfaceLow focus:outline-none",
            "focus:bg-surface-1 focus:border-surface-2 focus:ring-surface-3",
            "focus:text-onSurfaceLight",
          ].join(" ")}
          type="search"
          onChange={(e) =>
            e.target.value !== "/" && setSearchInput(e.target.value)
          }
          autoComplete="off"
          value={searchInput}
          placeholder="Search for delegate"
        />
      </div>
      <div className={""}>
        {searchInput &&
          suggestion &&
          suggestion.map((name, i) => (
            <div
              onClick={() => setSearchInput(name!)}
              className={[
                "text-lg",
                "cursor-pointer",
                "p-2",
                "text-onSurfacePrimaryMedium",
                i % 2 === 0 ? "bg-surface-2" : "bg-surface-1",
              ].join(" ")}
            >
              {name}
            </div>
          ))}
      </div>
    </div>
  )
}
