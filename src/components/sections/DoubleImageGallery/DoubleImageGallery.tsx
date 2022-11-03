/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react'
import { Image } from 'src/components/ui/Image'
import './doubleImageGallery.scss'
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
  className: 'doubleImageCarousel',
}

function DoubleImageGallery(data: any) {
  const doubleImageGallery = data.DoubleImageGallery
  const sliderRef = useRef<any>(null)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 656)
    window.addEventListener('resize', () =>
      setIsMobile(window.innerWidth < 656)
    )
  }, [])

  return (
    <>
      {isMobile ? (
        <div className="doubleImage__container-mobile">
          <button
            aria-label="arrow-left"
            className="arrow-left"
            onClick={() => sliderRef.current.slickPrev()}
          >
            <ArrowLeftIcon />
          </button>
          <Slider ref={sliderRef} {...sliderSettings}>
            {doubleImageGallery.map((image: any, index: number) => {
              return (
                <Link to={image.href} key={index} className="image-link">
                  <Image
                    baseUrl={image.src}
                    alt={image.alt}
                    sourceWidth={552}
                    sourceHeight={680}
                    breakpoints={[138, 207, 276, 345, 414, 483]}
                    loading="lazy"
                    objectFit="cover"
                    backgroundColor="#f0f0f0"
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
        <div className="doubleImage__container">
          {doubleImageGallery.map((image: any, index: number) => {
            return (
              <Link to={image.href} key={index}>
                <Image
                  baseUrl={image.src}
                  alt={image.alt}
                  sourceWidth={552}
                  sourceHeight={680}
                  loading="lazy"
                  objectFit="cover"
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
      )}
    </>
  )
}

export default DoubleImageGallery
