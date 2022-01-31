export const CommunityId = () => {
  return (
    <div>
      Chain:&nbsp;
      <span className={"font-bold"}>
        {process.env.NEXT_PUBLIC_NETWORK_COMMUNITY_ID}
      </span>
    </div>
  )
}
export default CommunityId
