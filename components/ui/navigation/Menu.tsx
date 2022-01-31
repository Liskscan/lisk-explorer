import { FC } from "react"
import { SubMenu } from "components/ui/navigation"
import { Link } from "components/ui"
import { TopBarType } from "@Types"

export const MenuItem: FC<{ link: string; label: string }> = ({
  link,
  label,
}) => {
  return (
    <Link
      className={[
        "hover:bg-menuButton",
        "hover:text-onMenuButton",
        "cursor-pointer",
        "px-3 py-2 mr-1",
        "rounded-md",
        "text-base",
        "font-medium pointer",
      ].join(" ")}
      activeClassName={[
        "bg-menuButton",
        "text-onMenuButton",
        "cursor-pointer",
        "px-3 py-2 mr-1",
        "rounded-md",
        "text-base",
        "font-medium pointer",
      ].join(" ")}
      link={link}
      href={link}
      color={"onTopbar"}
    >
      {label}
    </Link>
  )
}

export const Menu: FC<TopBarType> = ({ menu, subMenu }) => (
  <div className="hidden lg:block lg:ml-6">
    <div className="flex space-x-4">
      <div className="flex flex-row justify-end hidden md:inline-flex">
        {menu && menu.map((mi) => <MenuItem key={mi.label} {...mi} />)}
        {subMenu && <SubMenu {...subMenu} />}
      </div>
    </div>
  </div>
)
