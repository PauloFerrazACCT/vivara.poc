import React, { useLayoutEffect, useRef, useState } from 'react'
import imagesConf from 'src/images/config'
import { ImageWithArtDirection } from 'src/components/ui/Image'
import Slider from 'react-slick'
import './Carousel.scss'
import sliderSettings from 'src/configs/slider-carousel-banner'
import { EventPromoClick } from 'src/components/common/EventPromoClick'
import { PromoView } from 'src/components/common/PromoView'

function Carousel({ allItems }: any) {
  const sliderRef = useRef<any>(null)
  const [altForEvent, setAltForEvent] = useState<string>('')
  const [altAux, setAltAux] = useState<string>('')

  const { AddPromoView } = PromoView({
    altForEvent: altAux,
    identifier: 'home-carrossel-banner',
  })

  useLayoutEffect(() => {
    const getAltImageActive = () => {
      if (typeof window === 'undefined' || !window) {
        return
      }

      const element = `.homeBanner-container .slick-slider .slick-slide.slick-active img`
      const slickImage = window.document.querySelector(element)
      const hasAlt = slickImage?.getAttribute('alt')

      hasAlt && setAltAux(hasAlt)
    }

    getAltImageActive()

    window.addEventListener('load', getAltImageActive)

    return () => {
      window.removeEventListener('load', getAltImageActive)
    }
  }, [altForEvent])

  const dynamicImages = allItems?.map((item: any, index: number) => {
    const [desktopSource] = item?.sources?.filter(
      (e: any) => e.media === '(min-width: 40em)'
    )

    const [mobileSource] = item?.sources?.filter(
      (e: any) => e.media !== '(min-width: 40em)'
    )

    const desktop = {
      baseUrl: desktopSource.srcSet,
      ...imagesConf['carousel.desktop'],
    }

    const mobile = {
      baseUrl: mobileSource.srcSet,
      ...imagesConf['carousel.mobile'],
    }

    return (
      <div key={index} className="carousel-container">
        <a
          href={item.href}
          draggable
          onClick={() => {
            EventPromoClick(item?.alt, `homeCarrossel-banner`)
          }}
        >
          <ImageWithArtDirection
            desktop={desktop}
            mobile={mobile}
            alt={`${item.alt}${index}`}
            setAltForEvent={setAltForEvent}
          />
        </a>
      </div>
    )
  })

  return (
    <div className="slider-carousel-container">
      {
        <>
          {AddPromoView()}
          <Slider ref={sliderRef} {...sliderSettings}>
            {dynamicImages}
          </Slider>
        </>
      }
    </div>
  )
}

export default Carousel
