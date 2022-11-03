import React from 'react'
import WishlistDetails from 'src/components/wishlist/WishlistDetails'
import WishlistMenu from 'src/components/wishlist/WishlistMenu'

import './styles.scss'

const ListPage = ({ list }: any) => {
  return (
    <div className="wishlist-page__container">
      <aside className="wishlist-page__aside">
        <WishlistMenu />
      </aside>
      <WishlistDetails list={list} />
    </div>
  )
}

export default ListPage
