import { TableQueryColsProp } from "@Types"
import { BlockDataType } from "@moosty/lisk-service-provider"
import { Avatar, Link } from "components/ui"

export const generator: TableQueryColsProp = {
  value: "",
  format: (block: BlockDataType) => (
    <Link
      href={`/account/[[...slug]]`}
      color="onSurfaceLinkHigh"
      link={`/account/${block.generatorPublicKey}`}
      className={"cursor-pointer font-medium flex flex-row items-center"}
    >
      <Avatar address={block.generatorAddress} size={20} className="mr-2" />
      <span>{block.generatorUsername}</span>
    </Link>
  ),
}
