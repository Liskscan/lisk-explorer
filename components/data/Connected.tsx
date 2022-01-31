import { useLiskService } from "@moosty/lisk-service-provider"

export const Connected = () => {
  const { serviceClient } = useLiskService()

  return (
    <span
    className={[
      serviceClient?.isConnected()
        ? "bg-success"
        : process.env.NEXT_PUBLIC_NETWORK_WS
        ? "bg-warning"
        : "bg-error",
      "rounded-full w-4 h-4 flex mx-4",
    ].join(" ")}
    />
  )
}
