import Head from "next/head"
import { FC } from "react"

export const Meta: FC<{ title?: string }> = ({ title }) => {
  return (
    <Head>
      <title>
        {title ||
          `${process.env.NEXT_PUBLIC_EXPLORER_TITLE}-${process.env.NEXT_PUBLIC_EXPLORER_SUB_TITLE}`}
      </title>
    </Head>
  )
}
