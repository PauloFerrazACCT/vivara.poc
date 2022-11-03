/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'

interface Props {
  onClick?: () => void
}

const LeftArrowBlack = ({ onClick }: Props) => (
  <div
    className="shelf-arrow-left-container"
    onClick={onClick}
    onKeyDown={onClick}
  >
    <svg
      width="13"
      height="22"
      viewBox="0 0 13 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shelf-arrow-left"
    >
      <path
        d="M12 21L2 11L12 1.00458"
        stroke="black"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
    </svg>
  </div>
)

export default LeftArrowBlack
