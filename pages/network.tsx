import { PeersDataType } from "@moosty/lisk-service-provider"
import { Paper, Tooltip } from "components/ui"
import { fetchSSR } from "hooks/fetch"
import { PeersEnvelope } from "@Types"
import { FC, useState } from "react"
import Image from "next/image"
import { Meta } from "components/data/Meta"
import {
  ChevronDownIcon,
  ChevronUpIcon,
  FlagIcon,
  HashtagIcon,
  LockClosedIcon,
  LockOpenIcon,
  UserGroupIcon,
} from "@heroicons/react/solid"
import { useDecimals } from "providers/CurrencyProvider"
import { DataTable, KPI } from "@Components"

export const Network: FC<{ peersSSR: PeersDataType[]; statistics: any }> = ({
  peersSSR,
  statistics,
}) => {
  const [openKPI, setOpenKPI] = useState<boolean>(false)
  const { formatNumber } = useDecimals()

  return (
    <>
      <Meta title={"Network Nodes"} />
      <div className="w-full md:w-app max-w-app mx-auto space-y-4 flex flex-col items-center  bg-background text-base">
        <span
          className="bg-surface-1 rounded text-onSurfaceHigh md:hidden w-app mx-auto max-w-app px-2 py-2 flex flex-row justify-between"
          onClick={() => setOpenKPI(!openKPI)}
        >
          {openKPI ? "Hide" : "Show"} Peer Statistics
          {!openKPI && <ChevronDownIcon className="h-5 w-5" />}
          {openKPI && <ChevronUpIcon className="h-5 w-5" />}
        </span>
        <div
          className={[openKPI ? "block" : "hidden md:block", "w-full"].join(
            " ",
          )}
        >
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mx-auto w-full ">
            <Paper
              surface={1}
              shadow={0}
              className="w-app mx-auto md:w-1/3 p-4"
              key={"peers"}
            >
              <KPI
                icon={<UserGroupIcon className="h-5 w-5 text-onBackground" />}
                label={"Total Peers"}
                value={statistics?.data?.basic?.totalPeers}
              />
              <KPI
                icon={<LockClosedIcon className="h-5 w-5 text-onBackground" />}
                label={"Connected Peers"}
                value={statistics?.data?.basic?.connectedPeers}
              />
              <KPI
                icon={<LockOpenIcon className="h-5 w-5 text-onBackground" />}
                label={"Disconnected Peers"}
                value={statistics?.data?.basic?.disconnectedPeers}
              />
            </Paper>
            <Paper
              surface={1}
              shadow={0}
              className="w-app mx-auto md:w-1/3 p-4"
              key={"heights"}
            >
              {statistics?.data?.height &&
                Object.keys(statistics?.data?.height)?.map((height) => (
                  <KPI
                    icon={<HashtagIcon className="h-5 w-5 text-onBackground" />}
                    label={`Block height ${formatNumber(height)}`}
                    value={statistics?.data?.height[height]}
                  />
                ))}
            </Paper>
            <Paper
              surface={1}
              shadow={0}
              className="w-app mx-auto md:w-1/3 p-4"
              key={"networkversions"}
            >
              {statistics?.data?.networkVersion &&
                Object.keys(statistics?.data?.networkVersion)?.map(
                  (networkVersion) => (
                    <KPI
                      icon={<FlagIcon className="h-5 w-5 text-onBackground" />}
                      label={`Network version ${networkVersion}`}
                      value={statistics?.data?.networkVersion[networkVersion]}
                    />
                  ),
                )}
            </Paper>
          </div>
        </div>
        <div className="mx-auto w-full w-full ">
          <DataTable
            ssr={peersSSR}
            stickyHeader={true}
            oddClassName="bg-background text-onBackground"
            evenClassName="bg-background text-onBackground"
            method={"get.peers"}
            cols={[
              {
                value: "#",
                width: "120px",
                format: (peer: PeersDataType, foreign, n) => {
                  return <div className="text-onSurfaceMedium">{n + 1}</div>
                },
              },
              {
                value: "IP",
                width: "120px",
                format: (peer: PeersDataType) => (
                  <div className="text-onSurfaceMedium">{peer?.ip}</div>
                ),
              },
              {
                value: "Port",
                format: (peer: PeersDataType) => (
                  <div className="text-onSurfaceMedium"> {peer?.port}</div>
                ),
              },
              {
                value: "Location",
                format: (peer: PeersDataType) =>
                  peer?.location?.countryCode ? (
                    <Image
                      src={`/flags/${peer?.location?.countryCode?.toLowerCase()}.svg`}
                      width={24}
                      height={18}
                      alt={`Country flag ${peer?.location?.countryCode}`}
                    />
                  ) : (
                    "-"
                  ),
              },
              {
                align: "center",
                value: "Network Version",
                format: (peer: PeersDataType) => (
                  <div className="text-onSurfaceMedium">
                    {" "}
                    {peer?.networkVersion}
                  </div>
                ),
              },
              {
                value: "Height",
                format: (peer: PeersDataType) => (
                  <div className="text-onSurfaceMedium"> {peer?.height}</div>
                ),
              },
              {
                value: "Status",
                format: (peer: PeersDataType) =>
                  peer?.state === "connected" ? (
                    <Tooltip label={`Connected`}>
                      <span
                        className={"rounded-full w-5 h-5 bg-green flex ml-5"}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip label={`Disconnected`}>
                      <span
                        className={"rounded-full w-5 h-5 bg-yellow flex ml-5"}
                      />
                    </Tooltip>
                  ),
              },
            ]}
            params={{
              limit: 10000,
              sort: "networkVersion:desc",
            }}
          />
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async () => {
  const { data } = (await fetchSSR("peers", {
    limit: parseInt(process?.env?.NEXT_PUBLIC_PAGES_NETWORK_LIMIT!),
    sort: "height:desc",
  })) as PeersEnvelope
  const statistics = await fetchSSR("network/statistics", {})
  if (data) {
    return {
      props: {
        peersSSR: data.sort((a, b) =>
          a?.networkVersion && b?.networkVersion
            ? a?.networkVersion < b?.networkVersion
              ? 1
              : b?.networkVersion < a?.networkVersion
              ? -1
              : 0
            : 0,
        ),
        statistics,
      },
    }
  }
  return {
    notFound: true,
  }
}

export default Network
