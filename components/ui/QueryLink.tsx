import { FC } from "react"
import NextLink from "next/link"
import { QueryLinkProps } from "@Types"
import { useRouter } from "next/router"

export const QueryLink: FC<QueryLinkProps> = ({
  color = "info",
  children,
  link,
  className,
  activeClassName,
  onClick,
  href,
}) => {
  const router = useRouter()
  const isActive = router.pathname.split("/")[1] === link.split("/")[1]

  return (
    <NextLink prefetch={false} href={href}>
      <a
        onClick={() => onClick && onClick()}
        className={[
          `cursor-pointer text-${color} ${
            isActive && activeClassName ? activeClassName : className
          }`,
        ].join(" ")}
      >
        {children}
      </a>
    </NextLink>
  )
}
