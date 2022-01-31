export const Network = () => {
  return (
    <div>
      {process.env.NEXT_PUBLIC_NETWORK_NETWORK && (
        <div>Network: {process.env.NEXT_PUBLIC_NETWORK_NETWORK}</div>
      )}
    </div>
  )
}
export default Network
