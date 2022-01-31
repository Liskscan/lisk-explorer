import { KeyValueRow } from "components/ui"
import { Currency } from "components/ui/Currency"
import { compactString } from "utils/format"

export const ParseAsset = (asset: any) => {
  let assetList = []

  if (typeof asset === "object" && asset?.length > 0) {
    asset.reduce((non: any, assetItem: any) => {
      assetList.push(ParseAsset(assetItem))
      return 0
    }, 0)
  }

  if (typeof asset === "object" && Object.keys(asset)?.length > 1) {
    Object.keys(asset).map((assetKey, i) => {
      if (assetKey === "amount" || assetKey === "reward") {
        assetList.push(
          <div className="w-full">
            <div className="hidden md:inline-block w-full">
              <KeyValueRow
                key={`${assetKey}-${i}-kvr`}
                className={"ml-2"}
                label={assetKey}
                value={<Currency beddows={asset[assetKey]} />}
              />
            </div>
            <div className="inline-block md:hidden">
              <KeyValueRow
                key={`${assetKey}-${i}kvr`}
                className={"ml-2"}
                label={assetKey}
                value={<Currency beddows={asset[assetKey]} />}
              />
            </div>
          </div>,
        )
      }
      if (
        (assetKey !== "amount" &&
          assetKey !== "reward" &&
          typeof asset[assetKey] === "string") ||
        typeof asset[assetKey] === "number"
      ) {
        assetList.push(
          <div className="w-full">
            <div className="hidden md:inline-block w-full">
              <KeyValueRow
                key={`${assetKey}${i}-kvr`}
                className={"ml-2"}
                label={assetKey}
                value={`${asset[assetKey]} ${
                  assetKey === "generatorPublicKey" ? `()` : ``
                }`}
              />
            </div>
            <div className="inline-block md:hidden">
              <KeyValueRow
                key={`${assetKey}${i}kvr`}
                className={"ml-2"}
                label={assetKey}
                value={
                  asset[assetKey] &&
                  compactString(asset[assetKey].toString(), 42)
                }
              />
            </div>
          </div>,
        )
      } else if (assetKey !== "amount" && assetKey !== "reward") {
        assetList.push(
          <KeyValueRow
            key={`${assetKey}-${i}-kvr-`}
            label={assetKey}
            value={""}
          />,
        )
        assetList.push(ParseAsset(asset[assetKey]))
      }
    })
  }
  if (typeof asset === "string" || typeof asset === "number") {
    assetList.push(<KeyValueRow key={`${asset}--`} label={asset} value={""} />)
  }
  return assetList.flat()
}
