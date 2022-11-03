import React from 'react'
import type { FC } from 'react'

interface Props {
  itemStyle?: string
}

const MenuBlackArrowUpIcon: FC<Props> = ({ itemStyle }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="10"
    viewBox="0 0 16 10"
    fill="none"
    className={`menu-arrow__${itemStyle}`}
  >
    <path
      d="M1.33331 8.66669L8.00151 1.9985L14.6666 8.66669"
      stroke="#000000"
      strokeWidth="2"
      strokeMiterlimit="10"
    />
  </svg>
)

export default MenuBlackArrowUpIcon
