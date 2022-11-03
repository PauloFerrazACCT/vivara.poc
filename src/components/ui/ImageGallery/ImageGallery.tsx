/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Image } from 'src/components/ui/Image'
import Slider from 'react-slick'
import React, { useState } from 'react'
import InnerImageZoom from 'react-inner-image-zoom'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import './style.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Button } from '@faststore/ui'
import Video from 'src/components/common/Video/index'
import IconVideoPlay from 'src/images/svg/icon-video-play'

export interface ImageElementData {
  url: string
  alternateName: string
}

interface ImageGalleryProps {
  images: ImageElementData[]
  videos: string[]
}

const slideImage = {
  aspectRatio: 1,
  width: 92,
  height: 92,
  breakpoints: [250, 360, 480, 720],
  layout: 'constrained' as const,
  backgroundColor: '#f0f0f0',
  options: {
    fitIn: true,
  },
}

const settingsMain = {
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  infinite: true,
}

const sliderMobile = {
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  arrows: false,
  fade: true,
}

function ImageGallery({ images, videos }: ImageGalleryProps) {
  const settingsThumbs = {
    className: 'center',
    arrows: true,
    infinite: images.length > 3,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    focusOnSelect: true,
  }

  const OnClickThumbs = () => {
    const _v: any = document?.getElementById('pdpVideo')

    _v?.play()
  }

  const { width } = useWindowDimensions()

  const [nav1, setNav1] = useState()
  const [nav2, setNav2] = useState()

  const isMobile = width < 1024

  const settings = width > 1023 ? settingsMain : sliderMobile

  const videoLikeImage = [
    {
      url: videos ? videos[0] : '',
      alternateName: 'Vídeo do Produto',
    },
  ]

  const sliderSources: ImageElementData[] =
    videos && videos[videos.length - 1] !== ''
      ? images.concat(videoLikeImage)
      : images

  return (
    <div className="slider-container">
      <div className="zoom-container fake-color">
        <div className="zoom">
          <Slider
            asNavFor={nav2}
            ref={(slider1) => setNav1(slider1 ?? ({} as any))}
            {...settings}
          >
            {sliderSources?.map(
              (image: { url: string; alternateName: string }, idx: number) => {
                if (images.length - 1 >= idx) {
                  return (
                    <div className="slider-image-core" key={idx}>
                      <InnerImageZoom
                        src={image.url}
                        className="slider-image-zoom-inner-image"
                        imgAttributes={{ alt: image.alternateName }}
                        zoomType="hover"
                        zoomScale={1}
                        hideHint
                        hasSpacer
                        zoomPreload
                        hideCloseButton={!isMobile}
                      />
                    </div>
                  )
                }

                if (videos?.length) {
                  return (
                    <div className="slider-image-core" key={idx}>
                      <div className="collection-container__video">
                        {videos && (
                          <Video
                            videoSrcURL={videos[0]}
                            videoTitle=""
                            controlsVideo
                            soundVideo
                            loopingVideo
                            autoVideo={false}
                            videoId="pdpVideo"
                          />
                        )}
                      </div>
                    </div>
                  )
                }

                return undefined
              }
            )}
          </Slider>
        </div>
      </div>
      <div className="slider-container-minor">
        <Slider
          asNavFor={nav1}
          ref={(slider2) => setNav2(slider2 ?? ({} as any))}
          {...settingsThumbs}
        >
          {sliderSources?.map(
            (image: { url: string; alternateName: string }, idx: number) => {
              if (images.length - 1 >= idx) {
                return (
                  <div className="image-slide" key={idx}>
                    <Image
                      key={idx}
                      baseUrl={image.url}
                      alt={image.alternateName}
                      loading="eager"
                      {...slideImage}
                    />
                  </div>
                )
              }

              if (videos?.length) {
                return (
                  <div className="image-slide video" key={idx}>
                    <Image
                      key={idx}
                      baseUrl={images[0].url}
                      alt={image.alternateName}
                      loading="eager"
                      {...slideImage}
                    />
                    <Button id="thumb-video" onClick={OnClickThumbs}>
                      <IconVideoPlay />
                    </Button>
                  </div>
                )
              }

              return undefined
            }
          )}
        </Slider>
      </div>
    </div>
  )
}

export default ImageGallery
