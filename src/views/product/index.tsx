import './components/styles.scss'

import loadable from '@loadable/component'
import React from 'react'
import DetailsSideBar from 'src/components/sections/ProductDetails/DetailsSideBar'
import { View } from 'src/components/View'
import { SkuProvider } from 'src/contexts/ProductContext'
import { useProduct } from 'src/sdk/product/useProduct'
import type { FC } from 'react'
import type { PDPProps } from 'src/pages/[slug]/p'
import type { BrowserProductQueryQuery } from '@generated/graphql'

import Seo from './components/Seo'
import AboveTheFold from './components/AboveTheFold'

const BelowTheFold = loadable(() => import('./components/BelowTheFold'))

const ViewComponents = {
  seo: Seo,
  above: AboveTheFold,
  below: BelowTheFold,
} as const

const ProductView: FC<PDPProps> = (props) => {
  const { serverData } = props

  if (!serverData?.product) {
    throw new Error('Stale product not found')
  }

  // Stale while revalidate the product for fetching the new price etc
  const { data: productData } = useProduct(serverData?.product?.id, {
    product: serverData?.product,
  } as BrowserProductQueryQuery)

  if (!productData) {
    throw new Error('Product data not found')
  }

  const { product } = productData

  return (
    <SkuProvider>
      <div className="pdp-container">
        <View {...ViewComponents} data={{ ...props, product }} />
        <DetailsSideBar product={product} />
      </div>
    </SkuProvider>
  )
}

export default ProductView
