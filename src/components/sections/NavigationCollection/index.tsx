import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'gatsby'
import Slider from 'react-slick'
import sliderSettings from 'src/configs/slider-navigation-collection'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from 'src/images/svg/components/ArrowIcons'
import { Image } from 'src/components/ui/Image'
import { EventPromoClick } from 'src/components/common/EventPromoClick'
import './styles.scss'
import { AnchorLink } from 'gatsby-plugin-anchor-links'
import { PromoView } from 'src/components/common/PromoView'

type NavigationCollectionProps = {
  src: string
  href: string
  alt: string
  label: string
  description: string
}
type Props = {
  collections: NavigationCollectionProps[]
  title: string
  subtitle: string
  buttonLabel: string
  buttonLink: string
  isAnchorButton?: boolean
}
function NavigationCollection({
  collections,
  title,
  subtitle,
  buttonLabel,
  buttonLink,
  isAnchorButton,
}: Props) {
  const sliderRef = useRef<any>(null)
  const [style, setStyle] = useState('')
  const [altForEvent, setAltForEvent] = useState<string>('')

  const { AddPromoView } = PromoView({
    altForEvent,
    identifier: 'navigation-collection-home',
  })

  useEffect(() => {
    window.location.pathname === '/categoria/life' && setStyle('life')
  }, [])

  return (
    <div className="navigation-collection-container home-navigationcollection">
      <div className="navigation-collection-description home-navigationcollection-description">
        <h2 className={`navigation-collection-title ${style}`}>{title}</h2>
        <div className={`navigation-category-subtitle ${style}`}>
          <p>{subtitle}</p>
        </div>
        <div className={`navigation-collection-description-border ${style}`} />
      </div>
      <div className="navigation-collection-items">
        {
          <>
            <button
              aria-label="arrow-right"
              className="arrow-right"
              onClick={() => sliderRef.current.slickPrev()}
            >
              <ArrowLeftIcon />
            </button>
            {AddPromoView()}
            <Slider ref={sliderRef} {...sliderSettings}>
              {collections?.map((item, index) => (
                <Link
                  to={item.href}
                  aria-label={`link para Coleção ${item.label}`}
                  className={`navigation-collection-images ${style}`}
                  key={index}
                  onClick={() => {
                    EventPromoClick(item.alt, `NavigationCollection-Home`)
                  }}
                >
                  <Image
                    baseUrl={item.src}
                    alt={`${item.alt}${index}`}
                    aspectRatio={1}
                    layout="fullWidth"
                    backgroundColor="#F0F0F0"
                    loading="eager"
                    options={{
                      fitIn: true,
                    }}
                    setAltForEvent={setAltForEvent}
                  />
                  <h3>{item.label}</h3>
                  <p>{item.description}</p>
                </Link>
              ))}
            </Slider>
            <button
              aria-label="arrow-left"
              className="arrow-left"
              onClick={() => sliderRef.current.slickNext()}
            >
              <ArrowRightIcon />
            </button>
          </>
        }
      </div>
      {isAnchorButton === true ? (
        <AnchorLink
          to="#productgrid"
          title={buttonLabel}
          className={`btn-navigation-collection ${style}`}
        >
          {buttonLabel}
        </AnchorLink>
      ) : (
        <Link to={buttonLink} className={`btn-navigation-collection ${style}`}>
          {buttonLabel}
        </Link>
      )}
    </div>
  )
}

export default NavigationCollection
