import React, { useState } from 'react'
import { Link } from 'gatsby'
import { Image } from 'src/components/ui/Image'
import { EventPromoClick } from 'src/components/common/EventPromoClick'
import { PromoView } from 'src/components/common/PromoView'

import type { Props } from './index'

function BlockDesktop({ ImageTextImage }: Props) {
  const [altForEvent, setAltForEvent] = useState<string>('')

  const { AddPromoView } = PromoView({
    altForEvent,
    identifier: 'image-text-image-home',
  })

  return (
    <div className="navigattionTabs-container">
      <div className="section-center">
        {
          <>
            {AddPromoView()}
            {ImageTextImage?.map((item, index) => (
              <div key={index} className="block-active">
                <article className="block">
                  <div className="block-item">
                    <Image
                      baseUrl={item.src1}
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
                    <div className="block-info">
                      <header>
                        <h3 className="block-title">{item.title}</h3>
                      </header>
                      <p className="block-description">{item.description}</p>
                      <a
                        href={item.href}
                        className="block-selection"
                        onClick={() => {
                          EventPromoClick(item.alt, `NavigationTabs-Home`)
                        }}
                      >
                        Ver Seleção
                      </a>
                    </div>
                    <Image
                      baseUrl={item.src2}
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
                  </div>
                  <div className="block-gifts">
                    <Link
                      style={{
                        backgroundColor: item.buttonBackground,
                        color: item.buttonTextColor,
                      }}
                      to={item.href}
                      className="block-link"
                      onClick={() => {
                        EventPromoClick(item.alt, `NavigationTabs-Home`)
                      }}
                    >
                      {item.buttonText
                        ? item.buttonText
                        : 'Ver todos os presentes'}
                    </Link>
                    <div className="block-border" />
                  </div>
                </article>
              </div>
            ))}
          </>
        }
      </div>
    </div>
  )
}

export default BlockDesktop
