/* eslint-disable no-console */
import Carousel from 'src/components/ui/Carousel'
import React, { useEffect, useState } from 'react'
import imagesConf from 'src/images/config'
import { ImageWithArtDirection } from 'src/components/ui/Image'
import { Link } from 'gatsby'
import './showcaseBanner.scss'
import { EventPromoClick } from 'src/components/common/EventPromoClick'
import { PromoView } from 'src/components/common/PromoView'

function ShowcaseBanner({ allItems }: any) {
  const [style, setStyle] = useState('')
  const [altForEvent, setAltForEvent] = useState<string>('')

  const { AddPromoView } = PromoView({
    altForEvent,
    identifier: 'home-show-case-banner',
  })

  useEffect(() => {
    window.location.pathname === '/categoria/life' && setStyle('life')
  }, [])

  const showcaseImages = allItems?.map((item: any, index: number) => {
    const [desktopSource] = item?.sources?.filter(
      (e: any) => e.media === '(min-width: 40em)'
    )

    const [mobileSource] = item?.sources?.filter(
      (e: any) => e.media !== '(min-width: 40em)'
    )

    const desktop = {
      baseUrl: desktopSource?.srcSet,
      ...imagesConf['showcaseBanner.desktop'],
    }

    const mobile = {
      baseUrl: mobileSource?.srcSet,
      ...imagesConf['showcaseBanner.mobile'],
    }

    return (
      <Link
        to={item.href}
        key={index}
        className="showcaseBanner-container"
        onClick={() => {
          EventPromoClick(item?.alt, `homeShowCaseBanner-banner`)
        }}
      >
        <ImageWithArtDirection
          desktop={desktop}
          mobile={mobile}
          alt={`${item.alt}${index}`}
          objectFit="contain"
          setAltForEvent={setAltForEvent}
        />
        <h2 className={`showcaseBanner-title ${style}`}>{item.title}</h2>
        <p className="showcaseBanner-description">{item.description}</p>
        <button>SAIBA MAIS</button>
      </Link>
    )
  })

  return (
    <>
      {AddPromoView()}
      <div className="showcase-carousel-container">
        <Carousel id="showcase-carousel" infiniteMode controls="complete">
          {showcaseImages}
        </Carousel>
      </div>
    </>
  )
}

export default ShowcaseBanner
