import {useEffect, useRef, useState} from "react"

export const useNotification = (
  textValue = "",
  delay: number,
): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const timeoutRef = useRef<NodeJS.Timeout>()
  const [notificationText, setNotificationText] = useState<string>(textValue)

  useEffect(() => {
      timeoutRef.current && clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setNotificationText(""), delay)
      return () => {if(timeoutRef.current) { clearTimeout(timeoutRef.current) }}
    }
    ,[notificationText, delay])

  return [notificationText, setNotificationText]
}