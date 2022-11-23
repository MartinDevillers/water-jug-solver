/* eslint-disable react/style-prop-object */
/* eslint-disable react/no-unknown-property */
import React from "react"

interface BucketProps {
  readonly label: string
  readonly fill: number
}

const Bucket: React.FC<BucketProps> = ({ label, fill }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="68" height="80" viewBox="0 0 170 200">
    <defs>
      <clipPath id="bucket-mask" clipPathUnits="userSpaceOnUse">
        <path fill="#000" d="M7.622 7.072l18.404 185.881H144.63L163.034 7.072H7.622z" />
      </clipPath>
    </defs>
    <rect
      fill="#0093dd"
      fillOpacity="0.5"
      id="bucket-content"
      width="156"
      height="187"
      x="8"
      y={10 + 180 * (1 - fill)}
      clip-path="url(#bucket-mask)"
    />
    <path
      fill="none"
      stroke="#000"
      strokeDasharray="none"
      strokeOpacity="1"
      strokeWidth="5"
      d="M7.622 7.072l18.404 185.881H144.63L163.034 7.072H7.622z"
    />
    <text x="44" y="138" fill="#000" fontFamily="Arial" fontSize="106" fontWeight="900" opacity="0.5">
      {label}
    </text>
  </svg>
)

export default Bucket
