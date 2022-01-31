import { FC } from "react"
import { ForgersDataType } from "@moosty/lisk-service-provider"
import { Meta } from "components/data/Meta"
import { localRpc } from "utils"
import { DelegateTableContainer } from "containers/delegates/DelegateTableContainer"
import { DelegateAccountData } from "@Types"

export const Delegates: FC<{
  delegates: DelegateAccountData[]
  forgers: ForgersDataType[]
  delegatesLimit: number
}> = ({ delegates, forgers }) => {
  return (
    <>
      <Meta title={`Delegates`} />
      <div className="w-full md:w-app max-w-app mx-auto space-y-4 flex flex-col items-center  bg-background text-base">
        <DelegateTableContainer delegatesSSR={delegates} forgersSSR={forgers} />
      </div>
    </>
  )
}

export const getServerSideProps = async () => {
  const results = await localRpc.request([
    {
      method: "get.forgers",
      params: { limit: 103 },
    },
    {
      method: "get.accounts",
      params: {
        limit: 100,
        isDelegate: true,
      },
    },
  ])

  if (results) {
    return {
      props: {
        delegates: results?.[1]?.result?.data || null,
        delegatesLimit: results?.[1]?.result?.meta?.total || null,
        forgers: results?.[0]?.result?.data || null,
      },
    }
  }
  return {
    notFound: false,
  }
}

export default Delegates
