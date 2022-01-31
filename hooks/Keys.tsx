import { useHotkeys } from "react-hotkeys-hook"
import { useRouter } from "next/router"

export const useKeys = () => {
  const router = useRouter()
  useHotkeys(
    "d",
    (e) => {
      e.preventDefault()
      router.push("/delegates")
    },
    [],
  )
  useHotkeys(
    "t",
    (e) => {
      e.preventDefault()
      router.push("/transactions")
    },
    [],
  )
  useHotkeys(
    "b",
    (e) => {
      e.preventDefault()
      router.push("/blocks")
    },
    [],
  )
  useHotkeys(
    "v",
    (e) => {
      e.preventDefault()
      router.push("/votes")
    },
    [],
  )
  useHotkeys(
    "h",
    (e) => {
      e.preventDefault()
      router.push("/")
    },
    [],
  )
  useHotkeys(
    "n",
    (e) => {
      e.preventDefault()
      router.push("/network")
    },
    [],
  )
  useHotkeys(
    "i",
    (e) => {
      e.preventDefault()
      router.push("/chain-info")
    },
    [],
  )
  useHotkeys(
    "a",
    (e) => {
      e.preventDefault()
      router.push("/analyze")
    },
    [],
  )
  useHotkeys("cmd+left", () => router.back(), [])
}
