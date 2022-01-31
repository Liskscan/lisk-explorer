import { useEffect, useState } from "react"
import {
  getAddressFromLisk32Address,
  getFirstEightBytesReversed,
  getLisk32AddressFromAddress,
  getLisk32AddressFromPublicKey,
  hash,
  validateLisk32Address,
} from "../utils/lisk"

export const useAddressConverter = () => {
  const [input, setInput] = useState<string>("")
  const [lisk32, setLisk32] = useState<string>("")
  const [publicKey, setPublicKey] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [legacy, setLegacy] = useState<string>("")
  const [error, setError] = useState<string | undefined>(undefined)

  useEffect(() => {
    const isLisk32 = () => {
      try {
        return validateLisk32Address(input, "lsk")
      } catch (e) {
        return false
      }
    }
    const isAddress = () => {
      try {
        return validateLisk32Address(
          getLisk32AddressFromAddress(Buffer.from(input, "hex")),
          "lsk",
        )
      } catch (e) {
        return false
      }
    }
    const isPublicKey = () => {
      try {
        return (
          input.length === 64 &&
          validateLisk32Address(
            getLisk32AddressFromPublicKey(Buffer.from(input, "hex")),
            "lsk",
          )
        )
      } catch (e) {
        return false
      }
    }
    const isLegacy = () => {
      try {
        return (
          input.substr(input.length - 1, 1) === "L" &&
          BigInt(input.substr(0, input.length - 1)).toString() ===
            input.substr(0, input.length - 1)
        )
      } catch (e) {
        return false
      }
    }

    const getType = () => {
      if (isLisk32()) return "lisk32"
      if (isAddress()) return "address"
      if (isLegacy()) return "legacy"
      if (isPublicKey()) return "publicKey"
      return "unknown"
    }
    const setAddressFromInput = (inputType: string) => {
      switch (inputType) {
        case "lisk32":
          setAddress(
            new Buffer(getAddressFromLisk32Address(input, "lsk")).toString(
              "hex",
            ),
          )
          break
        case "address":
          setAddress(input)
          break
        case "publicKey":
          const base32 = getLisk32AddressFromPublicKey(
            Buffer.from(input, "hex"),
          )
          setAddress(
            new Buffer(getAddressFromLisk32Address(base32, "lsk")).toString(
              "hex",
            ),
          )
          break
        case "legacy":
          setAddress("")
          break
        default:
          setAddress("")
      }
    }
    const setPublicKeyFromInput = (inputType: string) => {
      switch (inputType) {
        case "lisk32":
          setPublicKey("")
          break
        case "address":
          setPublicKey("")
          break
        case "publicKey":
          setPublicKey(input)
          break
        case "legacy":
          setPublicKey("")
          break
        default:
          setPublicKey("")
      }
    }
    const setLisk32FromInput = (inputType: string) => {
      switch (inputType) {
        case "lisk32":
          setLisk32(input)
          break
        case "address":
          setAddress(getLisk32AddressFromAddress(Buffer.from(input, "hex")))
          break
        case "publicKey":
          setLisk32(getLisk32AddressFromPublicKey(Buffer.from(input, "hex")))
          break
        case "legacy":
          setLisk32("")
          break
        default:
          setLisk32("")
      }
    }

    const setLegacyFromInput = (inputType: string) => {
      const bufToBn = (buf: any) => {
        const hex: any = []
        const u8 = Uint8Array.from(buf)

        u8.forEach((i: any) => {
          var h = i.toString(16)
          if (h.length % 2) h = "0" + h
          hex.push(h)
        })

        return BigInt("0x" + hex.join(""))
      }
      switch (inputType) {
        case "lisk32":
          setLegacy(
            `${bufToBn(
              getFirstEightBytesReversed(
                getAddressFromLisk32Address(input, "lsk"),
              ),
            ).toString()}L`,
          )
          break
        case "address":
          const firstEightBytes = getFirstEightBytesReversed(
            Buffer.from(input, "hex"),
          )
          setLegacy(`${bufToBn(firstEightBytes).toString()}L`)
          break
        case "publicKey":
          const publicKeyHash = hash(Buffer.from(input, "hex"))
          setLegacy(
            `${bufToBn(getFirstEightBytesReversed(publicKeyHash)).toString()}L`,
          )
          break
        case "legacy":
          setLegacy(input)
          break
        default:
          setLegacy("")
      }
    }
    if (input) {
      const inputType = getType()
      if (inputType === "unknown") {
        setError("Input can't be analyzed")
      } else {
        setError(undefined)
      }
      setAddressFromInput(inputType)
      setLisk32FromInput(inputType)
      setPublicKeyFromInput(inputType)
      setLegacyFromInput(inputType)
    }
  }, [input])

  return {
    setInput,
    lisk32,
    publicKey,
    address,
    legacy,
    error,
  }
}
