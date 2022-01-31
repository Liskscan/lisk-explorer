import { convertBeddowsToLSK } from "./lisk"
import moment from "moment"

export const leadingZeros = (num: any, size: number) => {
  let s = num + ""
  while (s.length < size) s = "0" + s
  return s
}

export const formatTime = (
  time: number,
  short = true,
  relative = true,
  onlyDate = false,
) => {
  const timestamp = time * 1000

  return onlyDate
    ? moment(timestamp).format("D MMM YYYY")
    : relative && moment(timestamp).add(44, "minutes").isAfter(moment())
    ? moment(timestamp).fromNow()
    : !short
    ? moment(timestamp).format("dddd, MMMM Do YYYY, hh:mm:ss A Z")
    : moment(timestamp).format("D MMM YY hh:mm:ss A")
}

export const formatLSK = (lsk?: string, digits = 8, decimal = 8) => {
  if (!lsk) {
    return "LSK"
  }
  return `${new Intl.NumberFormat("en-US", {
    maximumSignificantDigits: digits,
    minimumFractionDigits: 0,
    maximumFractionDigits: decimal,
  }).format(parseFloat(convertBeddowsToLSK(lsk)))} LSK`
}

export const formatNormalCase = (str: string) => {
  return str
    .replace(/[A-Z]/g, (letter, index) => {
      const lcLet = letter.toLowerCase()
      return index ? " " + lcLet : lcLet
    })
    .replace(/([-_ ]){1,}/g, " ")
}

export const compactString = (
  string?: string,
  maxLength?: number,
  location: string = "middle",
  spacer: string = "...",
) => {
  if (!string) {
    return ""
  }
  if (!maxLength || string.length <= maxLength) {
    return string
  }
  if (location === "middle") {
    return `${string.substr(
      0,
      maxLength / 2 - spacer.length,
    )}${spacer}${string.substr(
      string.length - (maxLength / 2 - spacer.length),
    )}`
  } else if (location === "right") {
    return `${string.substr(0, maxLength - spacer.length)}${spacer}`
  } else if (location === "left") {
    return `${spacer}${string.substr(
      string.length - maxLength,
      string.length - spacer.length,
    )}`
  }
}
