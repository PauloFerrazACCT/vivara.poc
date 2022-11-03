import React, { useRef, useState } from 'react'
import Slider from 'react-slick'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from 'src/images/svg/components/ArrowIcons'
import './kit-carousel.scss'
import useWindowDimensions from 'src/hooks/useWindowDimensions'

import KitSlideDesktop from './Desktop/KitSlideDesktop'
import KitSlideMobile from './Mobile/KitSlideMobile'

const sliderSettings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  infinite: false,
  dots: true,
  className: 'KitCarousel',
}

const KitsCarousel = ({ productKits, buttonLabel }: any) => {
  const [mainProductId, setMainProductId] = useState<number>()
  const [secondaryProductId, setSecondaryProductId] = useState<number>()

  const [isProductDetailVisible, setIsProductDetailVisible] =
    useState<boolean>(false)

  const { width } = useWindowDimensions()
  const sliderRef = useRef<any>(null)

  const componentVisibility =
    mainProductId && secondaryProductId ? 'visible' : 'hidden'

  return (
    <div className={`kitcarousel__container-${componentVisibility}`}>
      <button
        aria-label="arrow-left"
        className="arrow-left"
        onClick={() => {
          sliderRef.current.slickPrev()
        }}
      >
        <ArrowLeftIcon />
      </button>
      <Slider ref={sliderRef} {...sliderSettings}>
        {productKits?.map((productKit: any, idx: number) => {
          return width > 1023 ? (
            <KitSlideDesktop
              key={idx}
              productKitInfo={productKit}
              buttonLabel={buttonLabel}
              mainProductId={mainProductId}
              setMainProductId={setMainProductId}
              secondaryProductId={secondaryProductId}
              setSecondaryProductId={setSecondaryProductId}
            />
          ) : (
            <KitSlideMobile
              key={idx}
              productKitInfo={productKit}
              buttonLabel={buttonLabel}
              isProductDetailVisible={isProductDetailVisible}
              setIsProductDetailVisible={setIsProductDetailVisible}
              mainProductId={mainProductId}
              setMainProductId={setMainProductId}
              secondaryProductId={secondaryProductId}
              setSecondaryProductId={setSecondaryProductId}
            />
          )
        })}
      </Slider>
      <button
        aria-label="arrow-right"
        className="arrow-right"
        onClick={() => {
          sliderRef.current.slickNext()
        }}
      >
        <ArrowRightIcon />
      </button>
    </div>
  )
}

export default KitsCarousel
