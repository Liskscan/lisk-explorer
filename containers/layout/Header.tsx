import { GotoTop, InfoBar, TopBar } from "components"
import { useKeys } from "hooks"
import { TopBarData } from "./TopBarData"

export const HeaderContainer = () => {
  useKeys()

  return (
    <div className={["z-50", "w-full", "mb-8"].join(" ")}>
      <InfoBar />
      <TopBar {...TopBarData} />
      <GotoTop />
    </div>
  )
}
