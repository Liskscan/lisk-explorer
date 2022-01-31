import { FC, useEffect, useState } from "react"
import moment from "moment"

moment.relativeTimeThreshold("s", 60)
moment.relativeTimeThreshold("ss", 2)
moment.relativeTimeThreshold("m", 45)

export const Time: FC<{
  timestamp: number
  update?: boolean
}> = ({ timestamp, update = true }) => {
  const [time, setTime] = useState<string>("")

  useEffect(() => {
    let timeInterval: any = null
    if (timestamp) {
      setTime(moment(timestamp * 1000).fromNow())
      if (update) {
        timeInterval = setInterval(
          () => setTime(moment(timestamp * 1000).fromNow()),
          1000,
        )
        if (
          timeInterval &&
          moment(timestamp * 1000).isBefore(moment().subtract(60, "seconds"))
        ) {
          clearInterval(timeInterval)
          timeInterval = setInterval(
            () => setTime(moment(timestamp * 1000).fromNow()),
            60000,
          )
        }
      }
    }
    return () => timeInterval && clearInterval(timeInterval)
  }, [timestamp, update])

  return <span className="whitespace-nowrap">{time}</span>
}
