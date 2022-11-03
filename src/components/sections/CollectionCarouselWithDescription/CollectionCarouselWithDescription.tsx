/* eslint-disable no-console */
import { useSession } from 'src/sdk/session'
import React, { useMemo, useRef } from 'react'
import Button from 'src/components/ui/VivaraButton'
import Slider from 'react-slick'
import ProductCard from 'src/components/product/ProductCard'
import './styles.scss'
import { Link } from 'gatsby'
import { useProductsQuery } from 'src/sdk/product/useProductsQuery'
import LeftArrowBlack from 'src/images/svg/icon-arrow-left-black'
import RightArrowBlack from 'src/images/svg/icon-arrow-right-black'

type Props = {
  title: string
  collectionId: string
  id: string
  subtitle: string
  description: string
  buttonLabel: string
  buttonLink: string
}

function CollectionCarouselWithDescription({
  id,
  title,
  subtitle,
  description,
  buttonLabel,
  buttonLink,
  collectionId,
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sliderRef = useRef<any>(null)

  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    slidesToShow: 4,
    nextArrow: (
      <RightArrowBlack onClick={() => sliderRef.current.slickNext()} />
    ),
    prevArrow: <LeftArrowBlack onClick={() => sliderRef.current.slickPrev()} />,
    className: 'collection-carousel-slider',
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 639,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 962,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1279,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  }

  const { channel } = useSession()

  if (!channel) {
    throw new Error(`useProduct: 'channel' from session is an empty string.`)
  }

  const productList = useProductsQuery({
    first: 10,
    after: '',
    sort: 'release_desc',
    term: '',
    selectedFacets: [
      { key: 'productClusterIds', value: collectionId },
      { key: 'channel', value: channel },
    ],
  })

  const products = useMemo(
    () => productList?.edges?.map((edge) => edge.node),
    [productList]
  )

  if (products && settings.slidesToShow > products.length) {
    settings.slidesToShow = products.length
  }

  return (
    <>
      <section className="collection-carousel" id={id}>
        <h2 className="collection-carousel__title">{title}</h2>
        <p className="collection-carousel__subtitle">{subtitle}</p>
        <div className="collection-carousel__border" />
        <p className="collection-carousel__description">{description}</p>
        <div className="collection-carousel__slider">
          <Slider ref={sliderRef} {...settings}>
            {products?.map((product, idx) => (
              <ProductCard product={product} index={idx} key={idx} />
            ))}
          </Slider>
        </div>
        <Link to={buttonLink}>
          <Button className="see-more-button" variant="dark">
            {buttonLabel}
          </Button>
        </Link>
      </section>
    </>
  )
}

export default CollectionCarouselWithDescription
