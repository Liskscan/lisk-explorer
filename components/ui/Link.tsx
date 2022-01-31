import { FC } from "react"
import { useRouter } from "next/router"
import NextLink from "next/link"
import { LinkProps } from "@Types"

export const Link: FC<LinkProps> = ({
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
    <NextLink prefetch={false} href={href} as={link}>
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
