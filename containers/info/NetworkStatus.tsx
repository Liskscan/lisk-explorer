import { FC } from "react"
import { Paper } from "components/ui"
import { useServiceEvents } from "@moosty/lisk-service-events"

export const NetworkStatus: FC = () => {
  const { status } = useServiceEvents()
  return (
    <Paper
      surface={1}
      className="w-full md:w-app max-w-app mx-auto p-4  hidden sm:block"
    >
      {status?.height && <pre>{JSON.stringify(status, null, 4)}</pre>}
      {!status?.height && <pre>Loading status...</pre>}
    </Paper>
  )
}
export default NetworkStatus
