import { io } from "socket.io-client"
import { Envelope, GetMethods, Param } from "@moosty/lisk-service-provider"

const socket = io(`${process.env.NEXT_PUBLIC_NETWORK_WS}/rpc-v2`, {
  transports: ["websocket"],
})

export const request = async (
  requests: { method: GetMethods; params: Param }[],
): Promise<any> => {
  const reqs = requests.map((request, id) => ({
    jsonrpc: "2.0",
    id: id,
    method: request.method,
    params: request.params,
  }))

  const results = await ws(reqs)
  return results.map((response) => ({
    method: reqs.find((request) => request.id === response.id)?.method,
    result: response.result,
  }))
}

export const ws = (
  requests: any[],
): Promise<{ result: Envelope; id: number }[]> =>
  new Promise((resolve, reject) => {
    socket.emit("request", requests, resolve)
  })
