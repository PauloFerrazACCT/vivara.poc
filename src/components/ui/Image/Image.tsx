import { useGetThumborImageData } from '@vtex/gatsby-plugin-thumbor'
import { GatsbyImage } from 'gatsby-plugin-image'
import React, { memo, useEffect, useMemo } from 'react'
import type { ThumborImageOptions } from '@vtex/gatsby-plugin-thumbor'
import type { GatsbyImageProps } from 'gatsby-plugin-image'
import { useInView } from 'react-intersection-observer'

interface Props extends Omit<GatsbyImageProps, 'image'>, ThumborImageOptions {
  setAltForEvent?: (value: string) => void
}

function Image({
  baseUrl,
  width,
  height,
  sourceWidth,
  sourceHeight,
  aspectRatio,
  layout,
  placeholderURL,
  backgroundColor,
  breakpoints,
  options,
  setAltForEvent,
  ...imgProps
}: Props) {
  const getImage = useGetThumborImageData()
  const { ref, inView } = useInView()

  const image = useMemo(
    () =>
      getImage({
        baseUrl,
        width,
        height,
        sourceWidth,
        sourceHeight,
        aspectRatio,
        layout,
        placeholderURL,
        backgroundColor,
        breakpoints,
        options,
      }),
    [
      aspectRatio,
      backgroundColor,
      baseUrl,
      breakpoints,
      getImage,
      height,
      layout,
      options,
      placeholderURL,
      sourceHeight,
      sourceWidth,
      width,
    ]
  )

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

export default memo(Image)
