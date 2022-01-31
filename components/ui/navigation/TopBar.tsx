import { FC } from "react"
import { Menu, MobileMenu } from "components/ui/navigation"
import { Link, Search } from "components/ui"
import { TopBarType } from "@Types"
import { LiskscanIcon } from "shared/icons"

export const TopBar: FC<TopBarType> = ({ menu, subMenu, actions }) => {
  return (
    <nav className="bg-topbar text-onTopbar z-40 w-full md:mb-4">
      <div className="w-app max-w-app mx-auto">
        <div className="relative flex items-center justify-between h-16 ">
          <div className="flex items-center px-2 lg:px-0">
            <div className="flex-shrink-0">
              <Link
                color={"onTopbar"}
                link={"/"}
                href={"/"}
                className="cursor-pointer  items-center float-left text-lg md:text-2xl items-center flex font-bold"
              >
                <LiskscanIcon className="cursor-pointer mr-2 fill-current text-onTopbar" />
                <div>
                  {process.env.NEXT_PUBLIC_EXPLORER_TITLE}
                  {process.env.NEXT_PUBLIC_EXPLORER_NETWORK && (
                    <sup>[{process.env.NEXT_PUBLIC_EXPLORER_NETWORK}]</sup>
                  )}
                </div>
              </Link>
            </div>
            <Menu menu={menu} subMenu={subMenu} />
          </div>
          <div className="w-full flex justify-end hidden md:inline-flex">
            <Search />
          </div>
        </div>
      </div>
      <MobileMenu menu={menu} subMenu={subMenu} />
    </nav>
  )
}
