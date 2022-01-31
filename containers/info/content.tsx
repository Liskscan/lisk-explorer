import React from "react"
import {
  BeakerIcon,
  LockClosedIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/solid"
import { NetworkStatusDataType } from "@moosty/lisk-connection-provider"
import { KPIPropsChainInfo } from "@Types"
import { Currency } from "components/ui/Currency"
import { compactString } from "../../utils/format"

export const infoKPIBlocks: { kpis: KPIPropsChainInfo[] }[] = [
  {
    kpis: [
      {
        icon: <BeakerIcon className="h-5 w-5 text-onBackground" />,
        label: "Community Identifier",
        kpi: "communityIdentifier",
      },
      {
        icon: <BeakerIcon className="h-5 w-5 text-onBackground" />,
        label: "Block Time",
        kpi: "blockTime",
      },
      {
        icon: <BeakerIcon className="h-5 w-5 text-onBackground" />,
        label: "Current Block Reward",
        kpi: "currentReward",
        format: (value: number) =>
          value ? <Currency beddows={value?.toString()} /> : "Loading...",
      },
    ],
  },
  {
    kpis: [
      {
        icon: <BeakerIcon className="h-5 w-5 text-onBackground" />,
        label: "Height",
        kpi: "height",
      },
      {
        icon: <LockClosedIcon className="h-5 w-5 text-onBackground" />,
        label: "Finalized Height",
        kpi: "finalizedHeight",
      },
      {
        icon: <BeakerIcon className="h-5 w-5 text-onBackground" />,
        label: "~ Blocks Until Finalized",
        kpi: "currentReward",
        tooltip: "true",
        format: (value: number, status: NetworkStatusDataType) =>
          status?.height && status?.finalizedHeight
            ? (
                BigInt(status.height) - BigInt(status.finalizedHeight)
              ).toString()
            : "Loading...",
      },
    ],
  },
  {
    kpis: [
      {
        icon: <ShieldExclamationIcon className="h-5 w-5 text-onBackground" />,
        label: "Network Version",
        kpi: "networkVersion",
      },
      {
        icon: <BeakerIcon className="h-5 w-5 text-onBackground" />,
        label: "Network Identifier",
        kpi: "networkIdentifier",
        format: (value: any) =>
          value ? compactString(value, 32)! : "Loading...",
      },
      {
        icon: <BeakerIcon className="h-5 w-5 text-onBackground" />,
        label: "Max Payload Length",
        kpi: "maxPayloadLength",
        format: (value: number) => (value ? `${value} bytes` : "Loading..."),
      },
    ],
  },
]
