import React from 'react'
import WishlistContainer from 'src/components/wishlist/WishlistContainer'
import WishlistMenu from 'src/components/wishlist/WishlistMenu'

import './styles.scss'

const WishlistPage = () => {
  return (
    <div className="wishlist-page__container">
      <aside className="wishlist-page__aside">
        <WishlistMenu />
      </aside>
      <WishlistContainer />
    </div>
  )
}

export default WishlistPage
