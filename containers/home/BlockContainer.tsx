import { FC } from "react"
import { BlockDataType } from "@moosty/lisk-service-provider"
import { useRouter } from "next/router"
import { blockColumns } from "containers"
import { DataTable } from "components"

export const BlockContainer: FC<{ blocks: BlockDataType[] }> = ({ blocks }) => {
  const router = useRouter()
  return (
    <div className="w-full z-20 md:w-2/4">
      <div className="mx-auto md:ml-2">
        <DataTable
          oddClassName="bg-background hover:bg-surface"
          evenClassName="bg-background hover:bg-surface"
          ssr={blocks}
          rowId={"id"}
          refresh={true}
          button={{
            label: "Explore more blocks".toUpperCase(),
            onClick: () => router.push("/blocks"),
          }}
          cols={[
            blockColumns.idDate,
            blockColumns.generator,
            blockColumns.transactionsRewards,
          ]}
        />
      </div>
    </div>
  )
}
