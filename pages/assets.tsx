import { FC, useState } from "react"
import { TransactionSchemasDataType } from "@moosty/lisk-service-provider"
import { fetchSSR } from "hooks/fetch"
import { NetworkStatusEnvelope, SchemasEnvelope } from "@Types"
import { NetworkStatusDataType } from "@moosty/lisk-connection-provider"
import { Meta } from "components/data/Meta"
import { FilterButtons } from "@Components"
import { Item } from "containers/assets/item"

export const Assets: FC<{
  schemas: TransactionSchemasDataType[]
  status: NetworkStatusDataType
}> = ({ schemas, status }) => {
  const [open, setOpen] = useState<string | undefined>()
  const [module, setModule] = useState<string[]>(status?.registeredModules)

  const onUpdate = (newModule: string) => {
    if (newModule === "all") {
      setModule(status?.registeredModules)
    } else {
      setModule([newModule as string])
    }
  }

  const keys = { dataType: "type" }
  const rename = (value: any): any => {
    if (!value || typeof value !== "object") return value
    if (Array.isArray(value)) return value.map(rename)
    return Object.fromEntries(
      Object.entries(value)
        // @ts-ignore
        .map(([k, v]) => [keys[k] || k, rename(v)]),
    )
  }
  return (
    <>
      <Meta
        title={`Modules (${status?.registeredModules?.length}) & Assets (${status?.moduleAssets?.length})`}
      />
      <div className="w-full md:w-app max-w-app mx-auto flex flex-col space-y-4 mb-16">
        <div className="flex flex-row space-x-4 justify-start md:w-10/12">
          {status?.registeredModules && (
            <FilterButtons
              className="flex flex-row flex-wrap"
              buttons={[
                {
                  label: "All Modules",
                  state: "all",
                },
                ...status.registeredModules.map((m) => ({
                  label: m,
                  state: m,
                })),
              ]}
              selection={module?.length > 1 || !module ? "all" : module[0]}
              defaultState={"all"}
              onChange={(state) => onUpdate(state)}
            />
          )}
        </div>
        <div className="divide-y divide-surfaceLight w-full mb-10 bg-background border-1 text-onSurfaceLight shadow mx-auto overflow-hidden sm:rounded-md">
          {schemas
            ?.filter(
              (asset) =>
                module?.indexOf(asset.moduleAssetName.split(":")[0]) > -1,
            )
            .map((asset) => (
              <Item
                key={`${asset.moduleAssetName}`}
                asset={asset}
                setOpen={setOpen}
                open={open}
              />
            ))}
        </div>
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  const { data } = (await fetchSSR(
    "transactions/schemas",
    {},
  )) as SchemasEnvelope
  const status = (await fetchSSR("network/status", {})) as NetworkStatusEnvelope
  if (data && status) {
    return {
      props: {
        schemas: data || null,
        status: status?.data || null,
      },
      revalidate: false,
    }
  }
  return {
    notFound: true,
  }
}

export default Assets
