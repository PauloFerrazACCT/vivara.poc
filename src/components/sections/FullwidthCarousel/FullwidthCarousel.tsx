import React, { useRef } from 'react'
import imagesConf from 'src/images/config'
import { ImageWithArtDirection } from 'src/components/ui/Image'
import Slider from 'react-slick'
import './fullwidthCarousel.scss'
import sliderSettings from 'src/configs/slider-carousel-banner'
import { Link } from 'gatsby'

function FullwidthCarousel({ allItems }: any) {
  const sliderRef = useRef<any>(null)

  const dynamicImages = allItems?.map((item: any, index: number) => {
    const [desktopSource] = item?.sources?.filter(
      (e: any) => e.media === '(min-width: 40em)'
    )

    const [mobileSource] = item?.sources?.filter(
      (e: any) => e.media !== '(min-width: 40em)'
    )

    const desktop = {
      baseUrl: desktopSource.srcSet,
      ...imagesConf['fullwidthCarousel.desktop'],
    }

    const mobile = {
      baseUrl: mobileSource.srcSet,
      ...imagesConf['fullwidthCarousel.mobile'],
    }

    return (
      <div key={index} className="fullwidthCarousel-container">
        <Link to={item.href} draggable>
          <ImageWithArtDirection
            desktop={desktop}
            mobile={mobile}
            alt={`${item.alt}${index}`}
            objectFit="contain"
          />
        </Link>
      </div>
    )
  })

  return (
    <div className="slider-fullwidthCarousel-container">
      <Slider ref={sliderRef} {...sliderSettings}>
        {dynamicImages}
      </Slider>
    </div>
  )
}

export default FullwidthCarousel
