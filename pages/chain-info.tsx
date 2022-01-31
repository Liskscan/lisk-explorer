import dynamic from "next/dynamic"
import { Meta } from "components/data/Meta"
import { infoKPIBlocks } from "containers/info/content"

const ChainInfoKPIS = dynamic(() => import("containers/info/ChainInfoKPIS"))
const NetworkStatus = dynamic(() => import("containers/info/NetworkStatus"))
const ServiceData = dynamic(() => import("containers/info/ServiceData"))
const ReadyStatus = dynamic(() => import("containers/info/ReadyStatus"))

export const Info = () => (
  <>
    <Meta title={"Raw chain info"} />
    <div className="w-full md:w-app max-w-app mx-auto space-y-4 flex flex-col items-center  bg-background mb-4  ">
      <ChainInfoKPIS kpiList={infoKPIBlocks} />
    </div>
    <div className="flex flex-col md:flex-row w-full md:w-app max-w-app mx-auto md:space-x-4 justify-center mb-4">
      <ServiceData />
      <ReadyStatus />
    </div>
    <NetworkStatus />
  </>
)

export const getStaticProps = async () => {
  return {
    props: {},
    revalidate: false,
  }
}

export default Info
