/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from 'react'
import imagesConf from 'src/images/config'
import { ImageWithArtDirection } from 'src/components/ui/Image'
import './fullwidth-narrow-banner.scss'
import { Link } from 'gatsby'

function FullwidthNarrowBanner(data: {
  sources: any
  alt: string
  href: string
}) {
  const { sources, alt, href } = data
  const [isLandscapeMode, setIsLandscapeMode] = useState(false)

  const sourceMobile = sources.filter((source: any) => {
    return source.media === '(max-width: 48em)'
  })

  const sourceDesktop = sources.filter((source: any) => {
    return source.media === '(min-width: 48em)'
  })

  const desktop = {
    baseUrl: sourceDesktop?.[0].srcSet,
    ...imagesConf['fullwidthBanner.desktop'],
  }

  const mobile = {
    baseUrl: sourceMobile?.[0].srcSet,
    ...imagesConf['fullwidthBanner.mobile'],
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
        loading="eager"
        objectFit="fill"
      />
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLandscapeMode, desktop, mobile])

  return (
    <>
      <Link to={href} className="fullwidthNarrowBanner-container">
        {image}
      </Link>
    </>
  )
}

export default FullwidthNarrowBanner
