import React from 'react'

import CartToggle from '.'

interface Props {
  isSearchOpen: boolean
}

const ValidationCartToggle = ({ isSearchOpen }: Props) => {
  return (
    <div data-minicart-toggle>
      {(isSearchOpen && window.innerWidth <= 768) || window.innerWidth > 768 ? (
        <CartToggle />
      ) : (
        ''
      )}
    </div>
  )
}

export default ValidationCartToggle
