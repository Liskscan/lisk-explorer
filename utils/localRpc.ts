import { io } from "socket.io-client"
import { Envelope, GetMethods, Param } from "@moosty/lisk-service-provider"

const socket = io(`${process.env.NEXT_PUBLIC_LOCAL_NETWORK_WS}/rpc-v2`, {
  transports: ["websocket"],
})

export const request = async (
  requests: { method: GetMethods; params: Param }[],
): Promise<any> => {
  const reqs = requests.map((r, id) => ({
    jsonrpc: "2.0",
    id: id + 1,
    method: r.method,
    params: r.params,
  }))

  const results = await ws(reqs)
  return results.map((r) => ({
    method: reqs.find((rr) => rr.id === r.id)?.method,
    result: r.result,
  }))
}

export const ws = (
  requests: any[],
): Promise<{ result: Envelope; id: number }[]> =>
  new Promise((resolve, reject) => {
    socket.emit("request", requests, resolve)
  })
