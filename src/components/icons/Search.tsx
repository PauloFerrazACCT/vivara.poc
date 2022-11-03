import React from 'react'
import type { FC } from 'react'

interface SearchIconProps {
  onClick?: () => void
  onMouseOver?: () => void
  style?: React.CSSProperties
}

const SearchIcon: FC<SearchIconProps> = ({ onClick, onMouseOver }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    data-search-icon
    onClick={onClick}
    onMouseOver={onMouseOver}
  >
    <path
      d="M8.37663 15.7533C12.4506 15.7533 15.7533 12.4506 15.7533 8.37663C15.7533 4.30263 12.4506 1 8.37663 1C4.30263 1 1 4.30263 1 8.37663C1 12.4506 4.30263 15.7533 8.37663 15.7533Z"
      stroke="black"
      strokeMiterlimit="10"
    />
    <path
      d="M13.4538 13.5537L18.8214 18.9999"
      stroke="black"
      strokeMiterlimit="10"
    />
  </svg>
)

export default SearchIcon
