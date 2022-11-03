/* eslint-disable no-console */
import { useSession } from 'src/sdk/session'
import React, { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import Button from 'src/components/ui/VivaraButton'
import Slider from 'react-slick'
import ProductCard from 'src/components/product/ProductCard'
import './styles.scss'
import { Link } from 'gatsby'
import { useProductsQuery } from 'src/sdk/product/useProductsQuery'
import LeftArrowBlack from 'src/images/svg/icon-arrow-left-black'
import RightArrowBlack from 'src/images/svg/icon-arrow-right-black'

import { ReducerImpression } from './Event/Reducer'
import { useCheckSendProducts } from './Event/Condition'

type Props = {
  title: string
  link: string
  collectionId: string
  buttonLabel: string
}

function CollectionCarousel({
  title,
  link,
  collectionId,
  buttonLabel = 'VER TODOS',
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sliderRef = useRef<any>(null)
  const [productsDataToEvent, dispatcher] = useReducer(ReducerImpression, [])

  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    slidesToShow: 4,
    nextArrow: (
      <RightArrowBlack onClick={() => sliderRef.current.slickNext()} />
    ),
    prevArrow: <LeftArrowBlack onClick={() => sliderRef.current.slickPrev()} />,
    className: 'release-shelf',
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

  const [style, setStyle] = useState('')
  const [brandName, setBrandName] = useState('Vivara')

  useEffect(() => {
    if (window.location.pathname === '/categoria/life') {
      setStyle('life')
      setBrandName('Life')
    }
  }, [])

  const {
    currency: { code },
    channel,
  } = useSession()

  if (!channel) {
    throw new Error(`useProduct: 'channel' from session is an empty string.`)
  }

  const productList = useProductsQuery({
    first: 10,
    after: '',
    sort: 'score_desc',
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

  const pageSize = products?.length ?? 0
  const currencyCode = code

  const { checkEventTrigger } = useCheckSendProducts(
    productsDataToEvent,
    pageSize,
    currencyCode,
    title
  )

  useMemo(() => {
    if (productsDataToEvent) {
      checkEventTrigger()
    }
  }, [checkEventTrigger, productsDataToEvent])

  return (
    <>
      <h2 className={`release-shelf__title ${style}`}>{title}</h2>
      <div className="release-shelf home-collectioncarousel">
        <p className={`release-shelf__subtitle ${style}`}>
          Descubra a próxima peça {brandName} para adicionar a sua coleção
        </p>
        <div className="release-shelf__slider">
          <Slider ref={sliderRef} {...settings}>
            {products?.map((product, idx) => (
              <ProductCard
                product={product}
                index={idx}
                key={idx}
                dispatcher={dispatcher}
                productsDataToEvent={productsDataToEvent}
              />
            ))}
          </Slider>
        </div>
        <Link to={link}>
          <Button className={`see-more-button ${style}`} variant="outlined">
            {buttonLabel}
          </Button>
        </Link>
      </div>
    </>
  )
}

export default CollectionCarousel
