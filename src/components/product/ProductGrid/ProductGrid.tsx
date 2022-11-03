import React, { useEffect, useState } from 'react'
import type { ProductSummary_ProductFragment } from '@generated/graphql'
import ProductGridSkeleton from 'src/components/skeletons/ProductGridSkeleton'
import loadable from '@loadable/component'

import './product-grid.scss'

const ProductCard = loadable(() => import('src/components/product/ProductCard'))

interface Props {
  products: ProductSummary_ProductFragment[]
  page: number
  pageSize: number
  isLoading?: boolean
  layoutGridOrList?: boolean
  setIsButtonLoading?: React.Dispatch<React.SetStateAction<boolean>>
}

function cleanSession() {
  sessionStorage.removeItem('clickedProductId')
}

// eslint-disable-next-line max-params
function scrollToHashElement(hash: string | null, offset: number) {
  const elementToScroll = document.getElementById(hash ?? '')

  if (!elementToScroll) {
    return
  }

  window.scrollTo({
    top: elementToScroll.offsetTop - offset,
    behavior: 'smooth',
  })

  setTimeout(() => {
    cleanSession()
  }, 1000)
}

function ProductGrid({
  products,
  page,
  pageSize,
  isLoading = false,
  layoutGridOrList,
  setIsButtonLoading,
}: Props) {
  const [hash, setHash] = useState<string | null>(null)

  useEffect(
    (offset = 280) => {
      sessionStorage.getItem('clickedProductId') &&
        setHash(sessionStorage.getItem('clickedProductId'))

      scrollToHashElement(hash, offset)
    },
    [hash]
  )

  return (
    <ProductGridSkeleton loading={isLoading}>
      <ul
        className={`product-grid ${
          layoutGridOrList === true ? 'list-card' : ''
        }`}
      >
        {products?.map((product, idx) => {
          if (product?.id === products[products.length - 1]?.id) {
            setIsButtonLoading?.(false)
          }

          return (
            <li id={product.id} key={`${product.id}`}>
              <ProductCard
                product={product}
                index={pageSize * page + idx + 1}
                bordered
                outOfStock={
                  product?.offers?.offers?.[0]?.availability !==
                  'https://schema.org/InStock'
                }
                variant="listing"
              />
            </li>
          )
        })}
      </ul>
    </ProductGridSkeleton>
  )
}

export default ProductGrid
