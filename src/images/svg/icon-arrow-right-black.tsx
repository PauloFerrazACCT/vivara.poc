/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'

interface Props {
  onClick?: () => void
}

const RightArrowBlack = ({ onClick }: Props) => (
  <div
    className="shelf-arrow-right-container"
    onClick={onClick}
    onKeyDown={onClick}
  >
    <svg
      width="13"
      height="22"
      viewBox="0 0 13 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shelf-arrow-right"
    >
      <path
        d="M1 1L11 11L1 20.9954"
        stroke="black"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
    </svg>
  </div>
)

export default RightArrowBlack
