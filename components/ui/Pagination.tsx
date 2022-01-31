import { FC } from "react"
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/react/solid"
import { useRouter } from "next/router"
import { QueryLink } from "components/ui/QueryLink"
import { CopyHotKey } from "../../containers"

export const Pagination: FC<{
  page: number
  items: number
  siblingCount?: number
  location: string
  href: string
  query?: any
}> = ({ page = 0, items = 0, siblingCount = 2, location, href, query }) => {
  const router = useRouter()
  const getClass = (item: number): string => {
    return page === item
      ? // current page
        [
          "cursor-pointer border-onSurface ",
          "text-onSurfacePrimaryHigh  pt-4 px-4 text-center items-center",
          "inline-flex items-center  ",
          "font-bold",
        ].join(" ")
      : // other pages
        [
          "cursor-pointer border-transparent",
          "text-onSurfacePrimaryMedium hover:text-gray-700",
          "hover:border-gray-300 ",
          "pt-4 px-4 inline-flex items-center",
          "text-base font-medium",
        ].join(" ")
  }

  const Dots = () => (
    <span className="border-transparent text-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-base font-medium ">
      ...
    </span>
  )

  const linkItem = (p: number) => {
    return (
      <QueryLink
        link={href}
        color="primary"
        key={`page-${p}`}
        href={{ pathname: `${location}/${p}`, query }}
        className={[getClass(p)].join(" ")}
      >
        {p + 1}
      </QueryLink>
    )
  }
  return (
    <nav className="w-full md:w-app max-w-app mx-auto   px-4 flex flex-row items-center justify-between sm:px-0 mb-6 items-center">
      <CopyHotKey
        message={"Previous page"}
        hotkey={"left"}
        action={() =>
          (!page || page - 1 >= 0) &&
          router.push({ pathname: `${location}/${page ? page - 1 : 0}`, query })
        }
        deps={[page]}
      />
      <CopyHotKey
        message={"Next page"}
        hotkey={"right"}
        action={() => {
          page < items - 1 &&
            router.push({ pathname: `${location}/${page + 1}`, query })
        }}
        deps={[page, items]}
      />
      <div className="-mt-px w-0 flex-1 flex">
        {page > 0 && (
          <QueryLink
            link={href}
            color="primary"
            href={{ pathname: `${location}/${page - 1 || 0}`, query }}
            className={[
              "cursor-pointer border-t-2 border-transparent",
              "pt-4 pr-1 inline-flex items-center",
              "text-base font-medium text-gray-500",
              "hover:text-gray-700 hover:border-gray-300",
            ].join(" ")}
          >
            <ArrowNarrowLeftIcon
              className="mr-3 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            Previous
          </QueryLink>
        )}
      </div>
      <div className="hidden md:-mt-px md:flex">
        {items > 0 &&
          items < 7 &&
          Array.from(Array(items).keys()).map(linkItem)}
        {items > 6 &&
          page < siblingCount &&
          Array.from(Array(siblingCount + 1).keys()).map(linkItem)}
        {items > 6 && page < siblingCount && <Dots />}
        {items > 6 && page < siblingCount && linkItem(items - 1)}
        {items > 6 && page >= siblingCount && linkItem(0)}
        {items > 6 && page >= siblingCount && <Dots />}
        {items > 6 &&
          page >= siblingCount &&
          page <= items - siblingCount &&
          Array.from(Array(siblingCount * 2 - 1).keys()).map((item) =>
            linkItem(1 + page - siblingCount + item),
          )}
        {items > 6 &&
          page >= siblingCount &&
          page < items - siblingCount - 1 && <Dots />}
        {items > 6 &&
          page >= siblingCount &&
          page <= items - siblingCount &&
          page < items - siblingCount &&
          linkItem(items - 1)}
        {items > 6 &&
          page >= siblingCount &&
          items - siblingCount < page &&
          page < items - 1 &&
          Array.from(Array(siblingCount + 1).keys()).map((item) =>
            linkItem(1 + page - siblingCount + item),
          )}
        {items > 6 &&
          page >= siblingCount &&
          items - siblingCount < page &&
          page === items - 1 &&
          Array.from(Array(siblingCount + 1).keys()).map((item) =>
            linkItem(page - siblingCount + item),
          )}
      </div>
      <div className="-mt-px w-0 flex-1 flex justify-end">
        {page < items - 1 && (
          <QueryLink
            link={href}
            color="primary"
            href={{ pathname: `${location}/${page + 1}`, query }}
            className={[
              "cursor-pointer border-t-2 border-transparent",
              "pt-4 pl-1 inline-flex items-center",
              "text-base font-medium text-gray-500",
              "hover:text-gray-700 hover:border-gray-300",
            ].join(" ")}
          >
            Next
            <ArrowNarrowRightIcon
              className="ml-3 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </QueryLink>
        )}
      </div>
    </nav>
  )
}
