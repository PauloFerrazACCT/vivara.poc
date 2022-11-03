import type { IStoreSelectedFacet } from '@faststore/api'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Slider from 'react-slick'
import ProductShelfSkeleton from 'src/components/skeletons/ProductShelfSkeleton'
import sliderSettings from 'src/configs/slider-pdp-shelf'
import { useProductsQuery } from 'src/sdk/product/useProductsQuery'
import { List as UIList } from '@faststore/ui'

import ProductCard from '../../product/ProductCard'

import './product-shelf.scss'

interface ProductShelfProps {
  first: number
  after: string
  selectedFacets?: IStoreSelectedFacet[]
  mainProductId?: string
}

function ProductShelfPDP({
  first,
  after,
  selectedFacets,
  mainProductId,
}: ProductShelfProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sliderRef = useRef<any>(null)

  const productList = useProductsQuery({
    first,
    after,
    sort: 'release_desc',
    term: '',
    selectedFacets: selectedFacets ?? [],
  })

  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 960)
    window.addEventListener('resize', () =>
      setIsMobile(window.innerWidth < 960)
    )
  }, [])

  const products = useMemo(() => {
    const fullProductList = productList?.edges.map((edge) => edge.node)

    if (fullProductList !== undefined) {
      return fullProductList.filter((item) => {
        return item.id !== mainProductId
      })
    }

    return fullProductList
  }, [mainProductId, productList?.edges])

  if (products) {
    if (products.length <= 3 && !isMobile) {
      return (
        <div className="card-collection">
          <ProductShelfSkeleton loading={products.length === 0}>
            <UIList className="card-collection--content">
              {products?.map((product, idx) => (
                <li className="card-collection--list" key={idx}>
                  <ProductCard
                    product={product}
                    index={idx}
                    key={idx}
                    variant="pdp"
                  />
                </li>
              ))}
            </UIList>
          </ProductShelfSkeleton>
        </div>
      )
    }

    return (
      <>
        <ProductShelfSkeleton loading={products.length === 0}>
          <Slider ref={sliderRef} {...sliderSettings}>
            {products?.map((product, idx) => (
              <ProductCard
                product={product}
                index={idx}
                key={idx}
                variant="pdp"
              />
            ))}
          </Slider>
        </ProductShelfSkeleton>
      </>
    )
  }

  return <></>
}

export default ProductShelfPDP
