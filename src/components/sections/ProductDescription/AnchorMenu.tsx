import './styles.scss'

import React, { useContext, useEffect, useMemo, useState } from 'react'
import type { BrowserProductQueryQuery } from '@generated/graphql'
import { HeaderSizeContext } from 'src/Layout'
import { parseItemListElement } from 'src/utils/product/parseItemListElement'
import { useProductsQuery } from 'src/sdk/product/useProductsQuery'

import ProductShelfPDP from '../ProductShelfPDP/ProductShelfPDP'
import Description from './Description'
import ProductDetails from './ProductDetails'
import VivaraCollection from './VivaraCollection'

interface Props {
  product: BrowserProductQueryQuery['product']
}

interface AnchorOffset {
  top: number
}

const ADJUST_OFFSET = 40

const AnchorMenu = ({ product }: Props) => {
  const {
    id,
    description,
    breadcrumbList: { itemListElement },
    isVariantOf: { additionalProperty },
  } = product

  const [anchorOffset, setAnchorOffset] = useState<AnchorOffset>()
  const headerSizeContext = useContext(HeaderSizeContext)

  useEffect(() => {
    if (headerSizeContext?.headerSize) {
      setAnchorOffset({ top: -(headerSizeContext.headerSize + ADJUST_OFFSET) })
    }
  }, [headerSizeContext])

  const [hasCollection, setHasCollection] = React.useState<boolean>(false)

  const filterSpecification = (query: string) => {
    return additionalProperty.filter(
      (el: { name: string }) =>
        el.name.toLowerCase().indexOf(query.toLowerCase()) > -1
    )
  }

  // This function transforms the itemListElement into the selectedFacets used to filter related products by category
  const selectedFacets = parseItemListElement(itemListElement)

  const checkColecao =
    filterSpecification('Coleção').length > 0
      ? filterSpecification('Coleção')[0]
          .value.normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/ /g, '-')
          .toLowerCase()
      : ''

  const productList = useProductsQuery({
    first: 6,
    after: '0',
    sort: 'release_desc',
    term: '',
    selectedFacets: [{ key: `colecao`, value: `${checkColecao}` }],
  })

  const products = useMemo(() => {
    const fullProductList = productList?.edges.map((edge) => edge.node)

    if (fullProductList !== undefined) {
      return fullProductList.filter((item) => {
        return item.id !== id
      })
    }

    return fullProductList
  }, [id, productList?.edges])

  return (
    <div>
      <nav className="anchor-above-container">
        {checkColecao !== '' && products && products.length !== 0 && (
          <a href="#complete-o-look" className="anchor-title">
            COMPLETE O LOOK
          </a>
        )}
        <a href="#description" className="anchor-title">
          <span>DESCRIÇÃO</span>
        </a>
        <a href="#product-details" className="anchor-title">
          <span>DETALHES</span>
        </a>
        {hasCollection && (
          <a href="#vivara-collection" className="anchor-title">
            <span>COLEÇÃO</span>
          </a>
        )}
        <a href="#relationships-products" className="anchor-title">
          <span>PRODUTOS RELACIONADOS</span>
        </a>
      </nav>
      <section className="anchor-below-container">
        {checkColecao !== '' && products && products.length !== 0 && (
          <>
            <div className="anchor-sub-title">
              <span
                id="complete-o-look"
                className="fake-anchor"
                style={anchorOffset}
              />
              <h2>COMPLETE O LOOK</h2>
            </div>
            <div className="shelf-container">
              <ProductShelfPDP
                first={6}
                after="0"
                selectedFacets={[{ key: `colecao`, value: `${checkColecao}` }]}
                mainProductId={id}
              />
            </div>
          </>
        )}
        <div className="anchor-sub-title">
          <span id="description" className="fake-anchor" style={anchorOffset} />
          <Description
            description={description}
            compositions={additionalProperty}
          />
        </div>
        <div className="anchor-sub-title anchor-sub-title-details">
          <span
            id="product-details"
            className="fake-anchor"
            style={anchorOffset}
          />
          <ProductDetails specification={additionalProperty} />
        </div>
        <div className="anchor-sub-title">
          <span
            id="vivara-collection"
            className="fake-anchor"
            style={anchorOffset}
          />
          <VivaraCollection
            collection={filterSpecification('Coleção')}
            setHasCollection={setHasCollection}
          />
        </div>
        <div className="anchor-sub-title">
          <span
            id="relationships-products"
            className="fake-anchor"
            style={anchorOffset}
          />
          PRODUTOS RELACIONADOS
        </div>
        <div className="shelf-container">
          <ProductShelfPDP
            first={6}
            after="0"
            selectedFacets={selectedFacets}
            mainProductId={id}
          />
        </div>
      </section>
    </div>
  )
}

export default AnchorMenu
