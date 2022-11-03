import './product-details.scss'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AddToWishlistModal from 'src/components/modal/AddToWishlistModal'
import SingleInputModal from 'src/components/modal/SingleInputModal'
import Breadcrumb from 'src/components/ui/Breadcrumb'
import { ImageGallery } from 'src/components/ui/ImageGallery'
import { useWishlistContext } from 'src/contexts/wishlist-context'
import type { BrowserProductQueryQuery } from '@generated/graphql'
import useReleaseDate from 'src/hooks/useReleaseDate'
import ReleaseTag from 'src/components/common/ReleaseTag'

interface Props {
  product: BrowserProductQueryQuery['product']
}

type GetAvailableItemsData = {
  url: string
  body: Record<string, unknown>
}

type ArrayRequest = Array<{
  items: Array<{
    Videos: string[]
    estimatedDateArrival: null
  }>
}>

function ProductDetails({ product }: Props) {
  const [isSaveProductModalOpen, setIsSaveProductModalOpen] = useState(false)
  const [isCreateWishlistModalOpen, setIsCreateWishlistModalOpen] =
    useState(false)

  const request: ArrayRequest = []
  const [productInfo, setProductInfo] = useState(request)
  const { createWishlist } = useWishlistContext()
  const {
    sku,
    breadcrumbList: breadcrumbs,
    image: productImages,
    id,
    releaseDate,
  } = product

  const getAvailableItems = async ({ url, body }: GetAvailableItemsData) => {
    await axios
      .post(url, body, {
        headers: {
          Accept: 'application/vnd.vtex.ds.v10+json',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setProductInfo(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    if (sku) {
      getAvailableItems({
        url: '/api/getAvailableItems',
        body: { skuId: sku },
      })
    }
  }, [sku])

  const isNewRelease = useReleaseDate(releaseDate, 2)

  return (
    <>
      <div className="product-details / grid-content grid-section">
        <Breadcrumb breadcrumbList={breadcrumbs.itemListElement} />

        <section className="product-details__body">
          <section className="product-details__left-section">
            <section className="product-details__image">
              {isNewRelease && <ReleaseTag variant="pdp" />}
              <ImageGallery
                images={productImages.filter(
                  (img) => !img.url.includes('_hover')
                )}
                videos={productInfo ? productInfo[0]?.items[0]?.Videos : ['']}
              />
            </section>
          </section>
        </section>
      </div>
      {isSaveProductModalOpen ? (
        <AddToWishlistModal
          product={product}
          productId={id}
          isOpen={isSaveProductModalOpen}
          setIsOpen={setIsSaveProductModalOpen}
          openWishlistModal={() => setIsCreateWishlistModalOpen(true)}
        />
      ) : (
        <></>
      )}
      {isCreateWishlistModalOpen ? (
        <SingleInputModal
          title="Dê um nome para sua lista"
          btnText="Salvar"
          isOpen={isCreateWishlistModalOpen}
          setIsOpen={setIsCreateWishlistModalOpen}
          modalAction={createWishlist}
          setIsSaveProductModalOpen={setIsSaveProductModalOpen}
          onClose={() => setIsSaveProductModalOpen(true)}
        />
      ) : (
        <></>
      )}
    </>
  )
}

export default ProductDetails
