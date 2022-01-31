import { FC, useEffect, useState } from "react"
import { KeyValueRow, Paper } from "components/ui"
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/solid"
import { useLiskService } from "@moosty/lisk-service-provider"
import { ReadyDataType } from "@moosty/lisk-connection-provider/dist/types"
import axios from "axios"

export const ReadyStatus: FC = () => {
  const { serviceClient } = useLiskService()
  const [statusReady, setStatusReady] = useState<ReadyDataType>()

  useEffect(() => {
    const getStatusReady = async () => {
      const { data } = (await axios.get(
        `${process.env.NEXT_PUBLIC_NETWORK_HTTP}/api/ready`,
      )) as { data: ReadyDataType }
      setStatusReady(data)
    }
    if (serviceClient) {
      getStatusReady()
    }
  }, [serviceClient])
  return (
    <Paper
      className=" z-20 flex-wrap md:flex-nowrap justify-around md:justify-between w-full  md:p-4"
      surface={1}
    >
      <h1 className="text-xl font-medium text-onSurfacePrimaryMedium mb-2 ">
        Ready Status
      </h1>

      <div className="flex z-20 flex-wrap md:flex-nowrap flex-row justify-around md:justify-between w-full ">
        <div className="flex flex-col flex-grow justify-between rounded ">
          <div className="hidden md:inline-flex">
            <KeyValueRow
              label="delegatesStatus"
              value={
                statusReady?.services?.delegatesStatus ? (
                  <CheckCircleIcon className="w-5 h-5 text-success mx-auto" />
                ) : (
                  <ExclamationCircleIcon className="w-5 h-5 text-error" />
                )
              }
              className={"text-center"}
            />
          </div>
          <div className="hidden md:inline-flex">
            <KeyValueRow
              label="feesStatus"
              value={
                statusReady?.services?.feesStatus ? (
                  <CheckCircleIcon className="w-5 h-5 text-success mx-auto" />
                ) : (
                  <ExclamationCircleIcon className="w-5 h-5 text-error" />
                )
              }
              className={"text-center"}
            />
          </div>
          <div className="hidden md:inline-flex">
            <KeyValueRow
              label="indexReadyStatus"
              value={
                statusReady?.services?.indexReadyStatus ? (
                  <CheckCircleIcon className="w-5 h-5 text-success mx-auto" />
                ) : (
                  <ExclamationCircleIcon className="w-5 h-5 text-error" />
                )
              }
              className={"text-center"}
            />
          </div>
          <div className="hidden md:inline-flex">
            <KeyValueRow
              label="lisk_accounts"
              value={
                statusReady?.services?.indexReadyStatus ? (
                  <CheckCircleIcon className="w-5 h-5 text-success mx-auto" />
                ) : (
                  <ExclamationCircleIcon className="w-5 h-5 text-error" />
                )
              }
              className={"text-center"}
            />
          </div>
          <div className="hidden md:inline-flex">
            <KeyValueRow
              label="lisk_blocks"
              value={
                statusReady?.services?.indexReadyStatus ? (
                  <CheckCircleIcon className="w-5 h-5 text-success mx-auto" />
                ) : (
                  <ExclamationCircleIcon className="w-5 h-5 text-error" />
                )
              }
              className={"text-center"}
            />
          </div>
          <div className="hidden md:inline-flex">
            <KeyValueRow
              label="lisk_transactions"
              value={
                statusReady?.services?.indexReadyStatus ? (
                  <CheckCircleIcon className="w-5 h-5 text-success mx-auto" />
                ) : (
                  <ExclamationCircleIcon className="w-5 h-5 text-error" />
                )
              }
              className={"text-center"}
            />
          </div>
          <div className="hidden md:inline-flex">
            <KeyValueRow
              label="transactionStatsStatus"
              value={
                statusReady?.services?.indexReadyStatus ? (
                  <CheckCircleIcon className="w-5 h-5 text-success mx-auto" />
                ) : (
                  <ExclamationCircleIcon className="w-5 h-5 text-error" />
                )
              }
              className={"text-center"}
            />
          </div>
        </div>
      </div>
    </Paper>
  )
}
export default ReadyStatus
