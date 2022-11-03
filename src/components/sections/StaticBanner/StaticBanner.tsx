/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from 'react'
import imagesConf from 'src/images/config'
import { ImageWithArtDirection } from 'src/components/ui/Image'
import './staticBanner.scss'
import { Link } from 'gatsby'
import { EventPromoClick } from 'src/components/common/EventPromoClick'
import { PromoView } from 'src/components/common/PromoView'

function StaticBanner(data: {
  sources: any
  alt: string
  href: string
  id: string
}) {
  const { sources, alt, href, id } = data
  const [isLandscapeMode, setIsLandscapeMode] = useState(false)
  const [altForEvent, setAltForEvent] = useState<string>('')

  const { AddPromoView } = PromoView({
    altForEvent,
    identifier: 'static-banner-home',
  })

  const sourceMobile = sources.filter((source: any) => {
    return source.media === '(max-width: 48em)'
  })

  const sourceDesktop = sources.filter((source: any) => {
    return source.media === '(min-width: 48em)'
  })

  const desktop = {
    baseUrl: sourceDesktop?.[0].srcSet,
    ...imagesConf['staticBanner.desktop'],
  }

  const mobile = {
    baseUrl: sourceMobile?.[0].srcSet,
    ...imagesConf['staticBanner.mobile'],
  }

  useEffect(() => {
    window.addEventListener('resize', () =>
      window?.innerWidth > 600 && window?.innerWidth < 950
        ? setIsLandscapeMode(true)
        : setIsLandscapeMode(false)
    )
  }, [])

  const image = useMemo(() => {
    return (
      <ImageWithArtDirection
        desktop={desktop}
        mobile={mobile}
        alt={alt}
        loading="lazy"
        objectFit="contain"
        setAltForEvent={setAltForEvent}
      />
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLandscapeMode, desktop, mobile])

  return (
    <>
      {href ? (
        <Link
          to={href}
          className="staticBanner-container"
          id={id}
          onClick={() => {
            EventPromoClick(alt, `StaticBanner-Home`)
          }}
        >
          {
            <>
              {' '}
              {AddPromoView()}
              {image}
            </>
          }
        </Link>
      ) : (
        <div className="staticBanner-container" id={id}>
          {
            <>
              {AddPromoView()}
              {image}
            </>
          }
        </div>
      )}
    </>
  )
}

export default StaticBanner
