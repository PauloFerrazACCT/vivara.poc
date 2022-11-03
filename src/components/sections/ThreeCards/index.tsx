import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from 'src/images/svg/components/ArrowIcons'
import React, { useRef, useEffect, useState } from 'react'
import Slider from 'react-slick'
import './styles.scss'
import { Link } from 'gatsby'

const settings = {
  arrows: true,
  dots: false,
  infinite: true,
  slidesToShow: 1,
  className: 'slider-shelf',
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 962,
      settings: {
        slidesToShow: 1,
        dots: true,
        arrows: true,
      },
    },
    {
      breakpoint: 1023,
      settings: {
        slidesToShow: 3,
        infinite: false,
        dots: true,
      },
    },
  ],
}

type Items = {
  image: string
  titleImage: string
  descriptionImage: string
  link: string
}

type ThreeCardsProps = {
  title: string
  subtitle: string
  description: string
  cards: Items[]
}

function ThreeCards({ title, subtitle, description, cards }: ThreeCardsProps) {
  const sliderRef = useRef<any>(null)

  const [isMobile, setIsMobile] = useState<boolean>()

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024)
    window.addEventListener('resize', () =>
      setIsMobile(window.innerWidth < 1024)
    )
  }, [])

  return (
    <>
      <div className="three-cards">
        <div className="three-cards__head">
          <h2>{title}</h2>
          <h3>{subtitle}</h3>
          <div className="border" />
          <p>{description}</p>
        </div>
        {isMobile ? (
          <div className="three-cards__content mobile">
            <button
              aria-label="arrow-right"
              className="arrow-right"
              data-store-icon-button="true"
              onClick={() => sliderRef.current.slickPrev()}
            >
              <ArrowLeftIcon />
            </button>
            <Slider ref={sliderRef} {...settings}>
              {cards?.map(
                (
                  { image, titleImage, descriptionImage, link }: Items,
                  index: number
                ) => {
                  return (
                    <div key={index}>
                      <Link to={link}>
                        <img src={image} alt={titleImage} />
                        <h4>{titleImage}</h4>
                        <p>{descriptionImage}</p>
                      </Link>
                    </div>
                  )
                }
              )}
            </Slider>
            <button
              aria-label="arrow-left"
              className="arrow-left"
              data-store-icon-button="true"
              onClick={() => sliderRef.current.slickNext()}
            >
              <ArrowRightIcon />
            </button>
          </div>
        ) : (
          <div className="three-cards__content">
            {cards?.map(
              (
                { image, titleImage, descriptionImage, link }: Items,
                index: number
              ) => {
                return (
                  <div key={index}>
                    <Link to={link}>
                      <img src={image} alt={titleImage} />
                      <h4>{titleImage}</h4>
                      <p>{descriptionImage}</p>
                    </Link>
                  </div>
                )
              }
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default ThreeCards
