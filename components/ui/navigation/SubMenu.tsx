import { FC, useState } from "react"
import ClickAwayListener from "react-click-away-listener"
import { Link } from "components/ui"

export const SubMenu: FC<{
  title: string
  items: {
    icon: any
    link: string
    label: string
    subLabel: string
  }[]
}> = ({ title, items }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        type="button"
        className={[
          "group",
          "text-onTopbar",
          "hover:bg-menuButton",
          "hover:text-onMenuButton",
          "cursor-pointer",
          "px-3 py-2",
          "rounded-md",
          "text-base",
          "font-medium pointer",
          "flex flex-row",
        ].join(" ")}
        aria-expanded="false"
      >
        <span className="text-base">{title}</span>
        <svg
          className="text-onTopbar ml-2 h-5 w-5 group-hover:text-onMenuButton"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {open && (
        <ClickAwayListener onClickAway={() => setOpen(!open)}>
          <div className="absolute z-50 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-max sm:px-0 ">
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden ">
              <div
                className={`relative grid grid-rows-3 grid-flow-col gap-6 bg-background px-5 py-6 sm:gap-8 sm:p-8`}
              >
                {items?.map((item) => (
                  <Link
                    href={item.link}
                    key={`sm-${item.link}`}
                    onClick={() => {
                      setOpen(false)
                    }}
                    link={item.link}
                    color="primary"
                    className="group -m-3 p-3 flex items-start rounded-lg hover:bg-surface-3 transition ease-in-out duration-150 cursor-pointer "
                    activeClassName="group -m-3 p-3 flex items-start rounded-lg bg-surface-3 transition ease-in-out duration-150 cursor-pointer "
                  >
                    {item?.icon}
                    <div className="ml-4">
                      <p className="text-base font-medium text-onSurfaceHigh group-hover:underline">
                        {item?.label}
                      </p>
                      <span className="mt-1 text-base text-onSurfaceMedium">
                        {item?.subLabel}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </ClickAwayListener>
      )}
    </div>
  )
}
