import { FC } from "react"
import { IconButton } from "components/ui"

export const Item: FC<{
  asset: any
  setOpen(value: any): any
  open?: string
}> = ({ asset, setOpen, open }) => {
  return (
    <div
      onClick={() =>
        asset?.moduleAssetId === open ? null : setOpen(asset?.moduleAssetId)
      }
      className={[
        "px-4 py-4 sm:px-6 cursor-pointer hover:bg-surface-1",
        asset?.moduleAssetId === open && "bg-surface-1",
      ].join(" ")}
    >
      <div className="flex justify-between items-center">
        <div className="flex flex-row">
          <p className="px-2 mx-2 inline-flex text-xs leading-5 font-bold rounded-full bg-secondary text-onSecondary">
            {asset?.moduleAssetId}
          </p>
          <p className="text-base font-medium text-onSurfacePrimaryMedium truncate">
            {asset?.moduleAssetName}
          </p>
        </div>
        <div className="mx-2 text-onSurfaceHigh">
          <IconButton aria-label={"View Schema"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </IconButton>
        </div>
      </div>
      {open === asset.moduleAssetId && (
        <div className={"bg-surface-2 p-5 text-onSurfaceMedium"}>
          <pre>{JSON.stringify(asset.schema, null, 4)}</pre>
        </div>
      )}
    </div>
  )
}
