import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { MarketPriceDataType } from "@moosty/lisk-service-provider"
import axios from "axios"
import { lisk } from "utils"
import { CurrencyProviderProps } from "@Types"

export const CurrencyContext = createContext<CurrencyProviderProps>(
  {} as CurrencyProviderProps,
)

export const useDecimals = () => useContext(CurrencyContext)

export const CurrencyProvider: FC = ({ children }) => {
  const parsedSettings = {
    convertCurrency: false,
    decimalSeparatorDot: false,
    trailingEnabled: false,
    decimals: 4,
    selectedCurrency: {
      symbol: "LSK",
      default: {
        sign: "",
        symbol: "LSK",
      },
    },
  }
  const [price, setPrice] = useState<MarketPriceDataType[]>(
    [] as MarketPriceDataType[],
  )

  const getBeddowsRate = (rate?: string) => {
    return BigInt((parseFloat(rate || "1") * 100000000).toFixed(0))
  }

  const formatNumber = (number?: string) =>
    number?.replace(
      /(.)(?=(\d{3})+$)/g,
      `$1${parsedSettings?.decimalSeparatorDot ? "," : "."}`,
    ) || ""

  const getConvertedBeddows = (rate: bigint, beddows: string) => {
    return (BigInt(beddows) * rate) / BigInt(10 ** 8)
  }

  const convertCurrency = (beddows: string) => {
    const rate = getBeddowsRate(
      price.find(
        (p) => p.code === `LSK_${parsedSettings?.selectedCurrency?.symbol}`,
      )?.rate,
    )
    const convertedBeddows = getConvertedBeddows(rate, beddows)
    return lisk.convertBeddowsToLSK(convertedBeddows.toString().slice(0, 19))
  }

  const parseBeddows = (
    beddows: string,
    convert = true,
    overRideDecimals?: number,
  ) => {
    const roundedValue = parseFloat(
      convert ? convertCurrency(beddows) : lisk.convertBeddowsToLSK(beddows),
    ).toFixed(
      parsedSettings?.decimals !== undefined ? parsedSettings.decimals : 4,
    )
    const split = parsedSettings?.trailingEnabled
      ? roundedValue.split(".")
      : Number(roundedValue).toString().split(".")
    return {
      lsk: beddows,
      number: parseInt(split[0]).toLocaleString(
        !parsedSettings?.decimalSeparatorDot ? "de-DE" : "en-US",
        {
          maximumFractionDigits: 0,
        },
      ),
      decimals:
        (overRideDecimals ?? parsedSettings?.decimals) > 0
          ? split[1]
          : undefined,
    }
  }

  useEffect(() => {
    const getNewPrices = async () => {
      const result = await axios(
        `${process.env.NEXT_PUBLIC_EXPLORER_PRICE_API}/prices`,
      )
      delete result.data.lastUpdate
      const parsedResults = Object.keys(result.data).map((code) => {
        return {
          code: `LSK_${code}`,
          from: "LSK",
          rate: result.data[code].price.toString(),
          to: code,
          updateTimestamp: 0,
          sources: ["coinmarketcap"],
        }
      })
      setPrice(parsedResults as MarketPriceDataType[])
    }
    if (process.env.NEXT_PUBLIC_EXPLORER_PRICE_API) {
      getNewPrices()
    }
  }, [])

  return (
    <CurrencyContext.Provider
      value={useMemo(
        () => ({
          decimals: parsedSettings?.decimals,
          price,
          parseBeddows,
          formatNumber,
        }),
        [parsedSettings?.decimals, price, parseBeddows, formatNumber],
      )}
    >
      {children}
    </CurrencyContext.Provider>
  )
}
