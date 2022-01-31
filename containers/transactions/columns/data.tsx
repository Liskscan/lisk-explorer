import { TransactionDataType } from "@moosty/lisk-service-provider"
import { Tooltip } from "components/ui"
import { ChatAltIcon } from "@heroicons/react/solid"
import { TableQueryColsProp } from "@Types"

export const data: TableQueryColsProp = {
  format: (transaction: TransactionDataType) => {
    return transaction?.asset?.data ? (
      <Tooltip label={transaction?.asset?.data}>
        {
          <ChatAltIcon
            className={"w-5 h-5 text-onSurfaceMedium cursor-pointer"}
          />
        }
      </Tooltip>
    ) : (
      <></>
    )
  },
}
