import { FC, useState } from "react"
import { InfoBar, Link, Search } from "components/ui"
import { useRouter } from "next/router"
import { MenuIcon, XIcon } from "@heroicons/react/solid"
import { TopBarType } from "@Types"
import { LiskscanIcon } from "shared/icons"

export const MobileMenu: FC<TopBarType> = ({ menu, subMenu }) => {
  const router = useRouter()
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div>
      <div className="lg:hidden absolute right-4 top-12 pt-0.5">
        <button
          onClick={() => setOpen(!open)}
          type="button"
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          aria-controls="mobile-menu"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          {!open && <MenuIcon className="h-5 w-5" />}
          {open && <XIcon className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-background w-full overflow-auto z-50 "
          id="mobile-menu"
        >
          <InfoBar />
          <div className="w-full bg-background md:hidden flex flex-row justify-between mb-2 px-4 py-4 mx-auto">
            <LiskscanIcon
              className={"text-onBackgroundHigh w-5 h-5 fill-current"}
            />
            <span className="text-onSurfaceHigh font-medium">
              Explorer Menu
            </span>
            <div onClick={() => setOpen(false)}>
              <XIcon className="w-5 h-5 text-onSurfaceHigh" />
            </div>
          </div>
          <div className="w-app mx-auto flex justify-end mb-3">
            <Search menuCloseFunction={() => setOpen(false)}/>
          </div>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-surface-1 mx-4 rounded">
            {menu &&
              menu?.map((mi) => (
                <Link
                  href={mi.link}
                  key={`mm-${mi.label}`}
                  link={mi.link}
                  onClick={() => {
                    if (setOpen) setOpen(false)
                  }}
                  color={"white"}
                  className={[
                    "bg-primaryVariant hover:bg-secondary",
                    "text-white block px-3 py-2 rounded-md",
                    "text-base font-medium text-onSurfaceHigh cursor-pointer",
                  ].join(" ")}
                >
                  {mi.label}
                </Link>
              ))}
          </div>
          <div className="pt-4 pb-3 ">
            <div className="px-2 space-y-1 pt-2 rounded mx-4 bg-surface-1 text-onSurfaceMedium">
              {subMenu &&
                subMenu?.items?.map((mi) => (
                  <span
                    key={`msm-${mi.label}`}
                    onClick={() => {
                      if (setOpen) setOpen(false)
                      router.push(mi.link)
                    }}
                    className="bg-surface-0 text-base  hover:bg-primaryVariant  block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                  >
                    {mi.label}
                  </span>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
