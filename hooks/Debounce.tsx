import { useEffect, useState } from "react"

export const useDebounce = (
  initialValue = "",
  delay: number,
): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [actualValue, setActualValue] = useState<string>(initialValue)
  const [debounceValue, setDebounceValue] = useState<string>(initialValue)

  useEffect(() => {
    const debounceId = setTimeout(() => setDebounceValue(actualValue), delay)
    return () => clearTimeout(debounceId)
  }, [actualValue, delay])

  return [debounceValue, setActualValue]
}
