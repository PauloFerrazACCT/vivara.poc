import React from 'react'
import type { FC } from 'react'

const CloseIcon: FC = () => (
  <svg
    data-close-icon
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1 1L5.00092 5.00092L1 9" stroke="white" strokeMiterlimit="10" />
    <path
      d="M9.00122 9L5.00031 4.99908L9.00122 1"
      stroke="white"
      strokeMiterlimit="10"
    />
  </svg>
)

export default CloseIcon
