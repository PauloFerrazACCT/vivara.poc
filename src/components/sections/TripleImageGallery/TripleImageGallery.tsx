/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react'
import { Image } from 'src/components/ui/Image'
import './tripleImageGallery.scss'
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
  className: 'tripleImageCarousel',
}

function TripleImageGallery(data: any) {
  const tripleImageGallery = data.TripleImageGallery
  const sliderRef = useRef<any>(null)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 960)
    window.addEventListener('resize', () =>
      setIsMobile(window.innerWidth < 960)
    )
  }, [])

  return (
    <>
      {isMobile ? (
        <div className="tripleImage__container-mobile">
          <button
            aria-label="arrow-left"
            className="arrow-left"
            onClick={() => sliderRef.current.slickPrev()}
          >
            <ArrowLeftIcon />
          </button>
          <Slider ref={sliderRef} {...sliderSettings}>
            {tripleImageGallery.map((image: any, index: number) => {
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
        <div className="tripleImage__container">
          {tripleImageGallery.map((image: any, index: number) => {
            return (
              <Link to={image.href} key={index}>
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
        </div>
      )}
    </>
  )
}

export default TripleImageGallery
