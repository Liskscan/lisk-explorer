import { TableQueryColsProp } from "@Types"
import { BlockDataType } from "@moosty/lisk-service-provider"
import { Link } from "components/ui"
import { Time } from "components/widgets/Time"

export const idDate: TableQueryColsProp = {
  value: "Blocks",
  style: { width: 180 },

  format: (block: BlockDataType) => (
    <div className={"h-10 text-onSurfaceMedium flex flex-col"}>
      <Link
        href={`/block/[blockId]`}
        color="onSurfaceLinkHigh"
        className={"cursor-pointer "}
        link={`/block/${block.id}`}
      >
        #{block.height}
      </Link>
      <Time timestamp={block.timestamp} update={true} />
    </div>
  ),
}
