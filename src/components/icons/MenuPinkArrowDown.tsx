import React from 'react'
import type { FC } from 'react'

interface Props {
  itemStyle?: string
}

const MenuPinkArrowDownIcon: FC<Props> = ({ itemStyle }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="10"
    viewBox="0 0 16 10"
    fill="none"
    className={`menu-arrow__${itemStyle}`}
  >
    <path
      d="M1.33333 1.33331L8.00152 8.0015L14.6667 1.33331"
      stroke="#F08769"
      strokeWidth="2"
      strokeMiterlimit="10"
    />
  </svg>
)

export default MenuPinkArrowDownIcon
