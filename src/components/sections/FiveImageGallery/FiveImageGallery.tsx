/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react'
import { Image } from 'src/components/ui/Image'
import './fiveImageGallery.scss'
import { Link } from 'gatsby'
import Slider from 'react-slick'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from 'src/images/svg/components/ArrowIcons'

const sliderSettings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  infinite: false,
  dots: true,
  className: 'fiveImageCarousel',
}

interface ImageProps {
  src: string
  alt: string
  href: string
}

interface FiveImageGalleryProps {
  mainImageSrc: string
  mainImageAlt: string
  mainImageHref: string
  mainImagePosition: string
  secondaryImages: ImageProps[]
  sliderImagesMobile?: ImageProps[]
}

function FiveImageGallery({
  mainImageSrc,
  mainImageAlt,
  mainImageHref,
  mainImagePosition,
  secondaryImages,
  sliderImagesMobile,
}: FiveImageGalleryProps) {
  const firstRow = secondaryImages.filter((_e, i) => {
    return i === 0 || i === 1
  })

  const secondRow = secondaryImages.filter((_e, i) => {
    return i === 2 || i === 3
  })

  const imageDisplay = mainImagePosition === 'left' ? 'row' : 'row-reverse'

  const sliderRef = useRef<any>(null)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 660)
    window.addEventListener('resize', () =>
      setIsMobile(window.innerWidth < 660)
    )
  }, [])

  return (
    <>
      {isMobile && sliderImagesMobile ? (
        <div className="fiveImageGallery__container-mobile">
          <button
            aria-label="arrow-left"
            className="arrow-left"
            onClick={() => sliderRef.current.slickPrev()}
          >
            <ArrowLeftIcon />
          </button>
          <Slider ref={sliderRef} {...sliderSettings}>
            {sliderImagesMobile.map((image: any, index: number) => {
              return (
                <Link to={image.href} key={index} className="image-link">
                  <Image
                    baseUrl={image.src}
                    alt={image.alt}
                    sourceWidth={640}
                    sourceHeight={640}
                    loading="lazy"
                    objectFit="contain"
                    layout="constrained"
                    backgroundColor="#f0f0f0"
                    options={{
                      fitIn: true,
                    }}
                  />
                </Link>
              )
            })}
          </Slider>
          <button
            aria-label="arrow-right"
            className="arrow-right"
            onClick={() => sliderRef.current.slickNext()}
          >
            <ArrowRightIcon />
          </button>
        </div>
      ) : (
        <div className="fiveImageGallery__container">
          <div
            className="fiveImageGallery__wrapper"
            style={{ flexDirection: `${imageDisplay}` }}
          >
            <Link to={mainImageHref}>
              <Image
                baseUrl={mainImageSrc}
                alt={mainImageAlt}
                sourceWidth={461}
                sourceHeight={800}
                loading="eager"
                objectFit="contain"
                layout="constrained"
                backgroundColor="#f0f0f0"
                options={{
                  fitIn: true,
                }}
              />
            </Link>
            <div className="fiveImageGallery__secondary-image-container">
              <div className="fiveImageGallery__first-row-container">
                {firstRow.map((image: any, index: number) => {
                  return (
                    <Link to={image.href} key={index}>
                      <Image
                        baseUrl={image.src}
                        alt={image.alt}
                        sourceWidth={324}
                        sourceHeight={400}
                        loading="lazy"
                        objectFit="contain"
                        layout="constrained"
                        backgroundColor="#f0f0f0"
                        options={{
                          fitIn: true,
                        }}
                      />
                    </Link>
                  )
                })}
              </div>
              <div className="fiveImageGallery__second-row-container">
                {secondRow.map((image: any, index: number) => {
                  return (
                    <Link to={image.href} key={index}>
                      <Image
                        baseUrl={image.src}
                        alt={image.alt}
                        sourceWidth={324}
                        sourceHeight={400}
                        loading="lazy"
                        objectFit="contain"
                        layout="constrained"
                        backgroundColor="#f0f0f0"
                        options={{
                          fitIn: true,
                        }}
                      />
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FiveImageGallery
