import { FC } from "react"

export const Button: FC<{
  className?: string
  onClick?: any
  value: string
  fullWidth?: boolean
}> = ({ className, onClick, value, fullWidth }) => (
  <button
    className={[className, fullWidth ? "w-full" : ""].join(" ")}
    onClick={onClick}
  >
    {value}
  </button>
)
