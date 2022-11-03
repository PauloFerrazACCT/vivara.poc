import React from 'react'
import PlusIcon from 'src/images/svg/icon-plus'

import IconButton from '../VivaraIconButton'

import './WishlistSizeSelector.module.scss'

interface WishlistSizeSelectorProps {
  text: string
  onClick: any
}

function WishlistSizeSelector({ text, onClick }: WishlistSizeSelectorProps) {
  return (
    <div data-wishlist-selector>
      <span>{text}</span>
      <IconButton
        icon={<PlusIcon />}
        aria-label="Adicionar tamanho"
        onClick={onClick}
      />
    </div>
  )
}

export default WishlistSizeSelector
