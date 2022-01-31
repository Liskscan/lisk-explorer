import { Link } from "components/ui"
import {
  ArchiveIcon,
  GlobeIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/solid"

export const MobileMenuBottom = () => {
  return (
    <div className="fixed sm:hidden bottom-0  bg-gradient-to-b from-transparent to-background w-full z-40 ">
      <div className="bg-topbar rounded mx-auto mb-4  w-app grid grid-cols-4 items-center mb-4 shadow">
        <Link
          href={"/"}
          color="onTopbar"
          link="/"
          className="flex flex-col items-center text-center py-3"
        >
          <HomeIcon className="w-4 h-4 text-onTopbar" />
          <span style={{ fontSize: 10 }} className="">
            Home
          </span>
        </Link>{" "}
        <Link
          href={"/transactions"}
          color="onTopbar"
          link="/transactions"
          className="flex flex-col items-center text-center py-2"
        >
          <GlobeIcon className="w-4 h-4 text-onTopbar" />
          <span style={{ fontSize: 10 }} className="">
            Transactions
          </span>
        </Link>{" "}
        <Link
          color="onTopbar"
          href={"/delegates"}
          link="/delegates"
          className="flex flex-col items-center text-center py-2"
        >
          <UsersIcon className="w-4 h-4 text-onTopbar" />
          <span style={{ fontSize: 10 }} className="">
            Delegates
          </span>
        </Link>{" "}
        <Link
          color="onTopbar"
          link="/votes"
          href="/votes"
          className="flex flex-col items-center text-center py-2"
        >
          <ArchiveIcon className="w-4 h-4 text-onTopbar" />
          <span style={{ fontSize: 10 }} className="">
            Votes
          </span>
        </Link>
      </div>
    </div>
  )
}
