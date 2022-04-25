import { FC, useEffect, useState } from "react"
import { KeyValueRow, Paper } from "components/ui"
import { StatusDataType, useLiskService } from "@moosty/lisk-service-provider"
import axios from "axios"

export const ServiceData: FC = () => {
  const { serviceClient } = useLiskService()
  const [serviceStatus, setStatus] = useState<StatusDataType>()

  useEffect(() => {
    const getStatus = async () => {
      const { data } = (await axios.get(
        `${process.env.NEXT_PUBLIC_NETWORK_HTTP}/api/status`,
      )) as { data: StatusDataType }
      setStatus(data)
    }
    if (serviceClient) {
      getStatus()
    }
  }, [serviceClient])
  return (
    <Paper
      className=" z-20 flex-wrap md:flex-nowrap justify-around md:justify-between w-app p-6 md:p-4 mx-auto"
      surface={1}
      shadow={0}
    >
      <h1 className="text-xl font-medium mb-2 text-onSurfacePrimaryMedium ">
        Service Data
      </h1>
      <div className="flex  flex-wrap md:flex-nowrap flex-row justify-around md:justify-between w-full ">
        <div className="flex flex-col flex-grow justify-between rounded  ">
          <div className="md:inline-flex">
            <KeyValueRow
              label="Name"
              value={serviceStatus?.name}
            />
          </div>
          <div className="md:inline-flex">
            <KeyValueRow
              label="Description"
              value={serviceStatus?.description}
            />
          </div>
          <div className="md:inline-flex">
            <KeyValueRow
              label="Build"
              value={serviceStatus?.build}
            />
          </div>

          <div className="md:inline-flex">
            <KeyValueRow
              label="Version"
              value={serviceStatus?.version}
            />
          </div>
        </div>
      </div>
    </Paper>
  )
}
export default ServiceData
