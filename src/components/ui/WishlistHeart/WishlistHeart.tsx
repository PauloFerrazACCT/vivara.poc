import React from 'react'
import { Link } from 'gatsby'
import HeartOutlineIcon from 'src/images/svg/icon-heart-outline'
import HeartFilledIcon from 'src/images/svg/icon-heart-filled'
import { useUserContext } from 'src/contexts/user-context'
import { useWishlistContext } from 'src/contexts/wishlist-context'
import { isProductOnWishlist } from 'src/utils/wishlist'

import storeConfig from '../../../../store.config'
import IconButton from '../VivaraIconButton'

import './WishlistHeart.module.scss'

interface WishlistButtonProps {
  id: string
  hasBackgroundColor?: boolean
  isOnShelf?: boolean
  onFilledHeartClick: () => void
  onEmptyHeartClick: () => void
  pdpPath: string
}

export default function WishlistHeart({
  id,
  hasBackgroundColor = true,
  isOnShelf = false,
  onFilledHeartClick,
  onEmptyHeartClick,
  pdpPath,
}: WishlistButtonProps) {
  const { user } = useUserContext()
  const { lists } = useWishlistContext()

  const isOnWishlist = isProductOnWishlist(id, lists)
  const HeartIcon = isOnWishlist ? <HeartFilledIcon /> : <HeartOutlineIcon />
  const arialLabel = isOnWishlist ? 'Desfavoritar' : 'Favoritar'

  if (!user) {
    const returnUrl = encodeURIComponent(pdpPath)

    return (
      <div
        data-wishlist-button
        data-wishlist-button-bg={hasBackgroundColor}
        data-wishlist-shelf={isOnShelf}
      >
        <Link
          data-login-link
          to={`${storeConfig.secureSubdomain}/login?returnUrl=${returnUrl}`}
        >
          <IconButton icon={<HeartOutlineIcon />} aria-label="Favoritar" />
        </Link>
      </div>
    )
  }

  return (
    <div
      data-wishlist-button
      data-wishlist-button-bg={hasBackgroundColor}
      data-wishlist-shelf={isOnShelf}
    >
      <IconButton
        icon={HeartIcon}
        aria-label={arialLabel}
        onClick={(e) => {
          e.preventDefault()
          if (isOnWishlist) {
            onFilledHeartClick()

            return
          }

          onEmptyHeartClick()
        }}
      />
    </div>
  )
}
