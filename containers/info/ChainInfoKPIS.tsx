import { FC, useEffect, useState } from "react"
import { Paper, Tooltip } from "components/ui"
import { KPIProps, KPIPropsChainInfo } from "@Types"
import { useServiceEvents } from "@moosty/lisk-service-events"
import { selectKey } from "../../utils/misc"
import { KPI } from "@Components"

export const ChainInfoKPIS: FC<{
  kpiList: { kpis: KPIPropsChainInfo[] }[]
}> = ({ kpiList }) => {
  const { status } = useServiceEvents()
  const [kpis, setKpis] = useState<KPIProps[][]>([[] as KPIProps[]])
  useEffect(() => {
    console.log(status)
    if (status) {
      setKpis(
        kpiList.map((items) =>
          items.kpis.map((kpi) => ({
            ...kpi,
            value: kpi.format
              ? kpi.format(selectKey(kpi.kpi, status), status)
              : selectKey(kpi.kpi, status) || "Loading...",
            tooltip: kpi.tooltip ? selectKey(kpi.kpi, status) : undefined,
          })),
        ),
      )
    }
  }, [status])

  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mx-auto w-full ">
      {kpis.map((item) => (
        <Paper surface={1} className="w-app mx-auto md:w-1/3 p-4">
          {item.map((kpi) =>
            kpi.tooltip ? (
              <Tooltip label={`${kpi.tooltip}`}>
                <KPI {...kpi} />
              </Tooltip>
            ) : (
              <KPI {...kpi} />
            ),
          )}
        </Paper>
      ))}
    </div>
  )
}
export default ChainInfoKPIS
