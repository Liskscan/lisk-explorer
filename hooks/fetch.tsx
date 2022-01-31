import { useEffect, useState } from "react"
import { Envelope } from "@moosty/lisk-connection-provider"
import {
  GetMethods,
  Param,
  useLiskService,
} from "@moosty/lisk-service-provider"

export const isBrowser = typeof window !== "undefined"

export const useFetch = (
  method: GetMethods,
  params: Param,
  fallback?: any,
): Envelope => {
  const { serviceClient } = useLiskService()
  const [result, setResult] = useState<any>({} as Envelope)
  useEffect(() => {
    const getResult = async () => {
      setResult(await serviceClient?.get(method, params))
    }
    serviceClient && getResult()
  }, [serviceClient, method, JSON.stringify(params)])
  return isBrowser
    ? result && Object.keys(result).length > 0
      ? result
      : fallback
    : fallback
    ? fallback
    : { data: undefined }
}

export const fetchSSR = async (
  method: string,
  params?: Param,
): Promise<Envelope> => {
  try {
    params = params || {}
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_NETWORK_HTTP
      }/api/v2/${method}?${new URLSearchParams(
        params as Record<string, string>,
      ).toString()}`,
    )
    return (await response.json()) as Envelope
  } catch (e) {
    return { data: [] }
  }
}

export const fetchMetaSSR = async (
  requests: { method: string; params: any; handle: string }[],
): Promise<any> => {
  const result: any = {}
  for (let req in requests) {
    const request = requests[req]
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NETWORK_HTTP}/api/v2/${
        request.method
      }?${new URLSearchParams(request.params).toString()}`,
    )
    const { data, meta } = (await response.json()) as { data: any[]; meta: any }
    result[request.handle] = { data, meta }
  }
  return result
}

export const fetchSSRMultiPage = async (
  method: string,
  params: Param,
  offset: number,
): Promise<any[]> => {
  const parsedParams = { ...params, limit: "10", offset }
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_NETWORK_HTTP
    }/api/v2/${method}?${new URLSearchParams(parsedParams as any).toString()}`,
  )
  let { data, meta } = (await response.json()) as { data: any[]; meta: any }
  if (data && params?.limit && offset + 10 < params.limit) {
    data = [...data, ...(await fetchSSRMultiPage(method, params, offset + 10))]
  }
  return data as any[]
}
