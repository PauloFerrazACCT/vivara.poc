import './styles.scss'
import React, { useRef, useState, useEffect } from 'react'
import Slider from 'react-slick'
import { Image } from 'src/components/ui/Image'
import { EventPromoClick } from 'src/components/common/EventPromoClick'
import { PromoView } from 'src/components/common/PromoView'

import SliderStyleGirlsConfig from '../../../configs/slider-style-girls'

type StyleGirlsProps = {
  src: string
  href: string
  alt: string
  label: string
  description: string
}

function StyleGirls(data: {
  title: string
  description: string
  collections: StyleGirlsProps[]
}) {
  const sliderRef = useRef<any>(null)
  const [altForEvent, setAltForEvent] = useState<string>('')
  const [eventHasDispatched, setEventHasDispatched] = useState(false)

  const { title, description, collections } = data

  useEffect(() => {
    setEventHasDispatched(true)
  }, [eventHasDispatched])

  const { AddPromoView } = PromoView({
    altForEvent,
    identifier: 'style-girls-banner',
  })

  return (
    <>
      <div className="stylegirls-container">
        {
          <>
            <h2 className="stylegirls-title">{title}</h2>
            <p className="stylegirls-subtitle">{description}</p>
            {eventHasDispatched ? AddPromoView() : ''}
            <Slider ref={sliderRef} {...SliderStyleGirlsConfig}>
              {collections?.map((item, index) => (
                <div key={index}>
                  <div data-store-style="true" data-testid="store-style">
                    <Image
                      baseUrl={item.src}
                      alt={`${item.alt}${index}`}
                      aspectRatio={1}
                      layout="constrained"
                      backgroundColor="#F0F0F0"
                      loading="lazy"
                      options={{
                        fitIn: true,
                      }}
                      setAltForEvent={setAltForEvent}
                    />
                    <div data-style-content="true">
                      <h3 className="stylegirls-models">{item.label}</h3>
                      <p className="stylegirls-description">
                        {item.description}
                      </p>
                      <a
                        href={item.href}
                        className="stylegirls-link"
                        onClick={() => {
                          EventPromoClick(item.alt, `StyleGirls-banner`)
                        }}
                      >
                        <button>Conhecer seleção</button>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </>
        }
      </div>
    </>
  )
}

export default StyleGirls
