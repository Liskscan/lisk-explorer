import { FC } from "react"

export const FilterButtons: FC<{
  buttons: {
    label: string
    state: string
  }[]
  defaultState: string
  className?: string
  onChange(newState: string): void
  selection: string
}> = ({ buttons, onChange, defaultState, className, selection }) => {
  return (
    <>
      <div className={[className, "hidden md:flex"].join(" ")}>
        {buttons.map((button) => (
          <span
            key={`button-${button.state}`}
            className={[
              " md:mr-4 px-3 py-2",
              "w-1/2 md:max-w-max rounded",
              "text-base font-medium",
              "hover:bg-surface-2 hover:text-onSurfaceHigh",
              "cursor-pointer",
              selection === button.state
                ? "bg-menuButton text-onMenuButton"
                : "bg-surface-1 text-onSurfaceMedium",
            ].join(" ")}
            onClick={() => {
              onChange(button.state)
            }}
          >
            {button.label}
          </span>
        ))}
      </div>
      <div className={"block md:hidden w-app mx-auto"}>
        <select
          className="w-full rounded text-onSurfaceMedium border-none text-base"
          onChange={(e) => onChange(e.target.value)}
        >
          {buttons.map((button) => (
            <option key={button.state} value={button.state}>
              {button.label}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}
