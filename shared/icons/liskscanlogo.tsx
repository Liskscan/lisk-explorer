import { FC } from "react"

export const LiskscanIcon: FC<{
  style?: object
  className?: string
}> = ({ style, className }) => (
  <svg
    className={`logo h-6 w-6 ${className}`}
    fill="none"
    fillRule="evenodd"
    stroke="black"
    strokeWidth="0.501"
    strokeLinejoin="bevel"
    strokeMiterlimit="10"
    fontFamily="Times New Roman"
    fontSize="16"
    style={style}
    xmlnsXlink="http://www.w3.org/1999/xlink"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    overflow="visible"
    width="460.164pt"
    height="456.814pt"
    viewBox="760.072 -649.352 460.164 456.814"
  >
    <g transform="scale(1 -1)">
      <g strokeLinejoin="miter" stroke="none" strokeWidth="3.397">
        <path
          d="M 760.702,640.587 L 760.072,192.538 L 1209.87,192.538 L 1083.87,318.682 L 886.421,318.682 L 886.339,515.478 L 760.702,640.587 Z"
          markerStart="none"
          markerEnd="none"
        />
        <path
          d="M 1219.61,201.303 L 1220.24,649.352 L 770.439,649.352 L 896.437,523.209 L 1093.89,523.209 L 1093.97,326.412 L 1219.61,201.303 Z"
          markerStart="none"
          markerEnd="none"
        />
      </g>
    </g>
  </svg>
)
