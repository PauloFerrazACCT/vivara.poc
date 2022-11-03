import React, { useRef } from 'react'
import type { ProductSummary_ProductFragment } from '@generated/graphql'
import Slider from 'react-slick'
import ProductShelfSkeleton from 'src/components/skeletons/ProductShelfSkeleton'
import sliderSettings from 'src/configs/slider-home-shelf'

import ProductCard from '../../product/ProductCard'

import './product-shelf.scss'

interface ProductShelfProps {
  products: ProductSummary_ProductFragment[]
}

function ProductShelf({ products }: ProductShelfProps) {
  const sliderRef = useRef<any>(null)

  if (sliderSettings.slidesToShow > products.length) {
    sliderSettings.slidesToShow = products.length
  }

  return (
    <ProductShelfSkeleton loading={products.length === 0}>
      <Slider ref={sliderRef} {...sliderSettings}>
        {products?.map((product, idx) => (
          <ProductCard product={product} index={idx} key={idx} />
        ))}
      </Slider>
    </ProductShelfSkeleton>
  )
}

export default ProductShelf
