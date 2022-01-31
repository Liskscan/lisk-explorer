import { FC } from "react"

export const IconButton: FC<{
  onClick?: any
  className?: string
}> = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    type="button"
    className={[
      "ml-2 mx-auto",
      "inline-flex items-center",
      "border border-transparent rounded-full",
      "shadow-sm text-textPlaceHolder",
      "bg-transparent hover:bg-surfaceDark focus:outline-none",
      className,
    ].join(" ")}
  >
    {children}
  </button>
)
