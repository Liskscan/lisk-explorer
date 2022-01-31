import dynamic from "next/dynamic"
const BlockHeight = dynamic(() => import("components/ui/InfoBar/BlockHeight"))
const CommunityId = dynamic(() => import("components/ui/InfoBar/CommunityId"))
const Network = dynamic(() => import("components/ui/InfoBar/Network"))
const Status = dynamic(() => import("components/ui/InfoBar/Status"))

export const InfoBar = () => (
  <div className="h-10 flex flex-row items-center bg-infobar text-onInfobar w-full z-50">
    <div className="w-full md:w-app max-w-app mx-auto flex flex-row items-end justify-end content-end space-x-2 md:space-x-4">
      <div />
      <div className="flex flex-row md:justify-end mx-auto w-full md:w-auto space-x-2 md:space-x-4">
        <CommunityId />
        <Network />
        <BlockHeight />
        <Status />
      </div>
    </div>
  </div>
)
