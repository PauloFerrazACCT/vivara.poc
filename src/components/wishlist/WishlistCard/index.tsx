import React, { useCallback } from 'react'
import { navigate } from 'gatsby'

import './styles.scss'
import { WishlistProductImage } from '../WishlistProductImage'
import { WishlistProductCardSkeleton } from '../WishlistProductCardSkeleton'

interface WishlistCardProps {
  list: Wishlist
}

function WishlistCard({ list }: WishlistCardProps) {
  const { productList } = list
  const productCardList: boolean[] = []

  const productCard = useCallback(() => {
    for (let i = 0; i < 4; i++) {
      productCardList[i] = !!productList[i]
    }

    return productCardList?.map((isTrue: boolean, i: number) =>
      isTrue ? (
        <WishlistProductImage
          key={`ProductImage-${i}`}
          product={productList[i]}
        />
      ) : (
        <div key={`skeleton-${i}`} className="wishlist-card__imgs-fallback" />
      )
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productList])

  return (
    <div
      className="wishlist-card"
      role="link"
      tabIndex={0}
      onKeyUp={(e) => {
        if (e.key === 'Enter') {
          navigate('/wishlist/list', { state: { list } })
        }
      }}
      onClick={() => {
        navigate('/wishlist/list', { state: { list } })
      }}
    >
      <div className="wishlist-card__imgs">
        <div className="wishlist-card__imgs-container">
          {!productList.length ? (
            <WishlistProductCardSkeleton />
          ) : (
            productCard()
          )}
        </div>
      </div>
      <div className="wishlist-card__text">
        <p className="wishlist-card__text-title">{list?.name}</p>
        <p className="wishlist-card__text-subtitle">
          {list?.productList?.length} itens
        </p>
      </div>
    </div>
  )
}

export default WishlistCard
