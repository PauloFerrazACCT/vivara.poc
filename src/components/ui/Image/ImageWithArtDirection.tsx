import { useGetThumborImageData } from '@vtex/gatsby-plugin-thumbor'
import { GatsbyImage, withArtDirection } from 'gatsby-plugin-image'
import React, { useEffect, useMemo } from 'react'
import type { ThumborImageOptions } from '@vtex/gatsby-plugin-thumbor'
import type { GatsbyImageProps } from 'gatsby-plugin-image'
import { useInView } from 'react-intersection-observer'

interface Props extends Omit<GatsbyImageProps, 'image'> {
  desktop: ThumborImageOptions
  mobile: ThumborImageOptions
  setAltForEvent?: (value: string) => void
}

const DESKTOP_BREAKPOINTS = [1920]

function ImageWithArtDirection({
  mobile,
  desktop,
  setAltForEvent,
  ...imgProps
}: Props) {
  const getImage = useGetThumborImageData()
  const { ref, inView } = useInView()

  const image = useMemo(() => {
    const mobileImage = getImage(mobile)
    const desktopImage = getImage({
      ...desktop,
      breakpoints: DESKTOP_BREAKPOINTS,
    })

    return withArtDirection(mobileImage, [
      {
        media: '(min-width: 40em)',
        image: desktopImage,
      },
    ])
  }, [desktop, getImage, mobile])

  useEffect(() => {
    if (inView && setAltForEvent && imgProps.alt) {
      setAltForEvent(imgProps.alt)
    }
  }, [inView])

  return (
    <>
      <div ref={ref} />
      <GatsbyImage {...imgProps} image={image} />
    </>
  )
}

export default ImageWithArtDirection
