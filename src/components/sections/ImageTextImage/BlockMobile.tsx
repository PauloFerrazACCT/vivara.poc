import React, { useState } from 'react'
import { List } from '@faststore/ui'
import { Link } from 'gatsby'
import { Image } from 'src/components/ui/Image'
import { EventPromoClick } from 'src/components/common/EventPromoClick'
import { PromoView } from 'src/components/common/PromoView'

import type { Props } from './index'

import 'slick-carousel/slick/slick.scss'
import 'slick-carousel/slick/slick-theme.scss'

function BlockMobile({ ImageTextImage }: Props) {
  const [altForEvent, setAltForEvent] = useState<string>('')

  const { AddPromoView } = PromoView({
    altForEvent,
    identifier: 'image-text-image-home',
  })

  return (
    <div className="navigattionTabs-container">
      <div className="section-top">
        <div className="navigattionTabs-list">
          <List variant="unordered">
            {
              <>
                {AddPromoView()}

                {ImageTextImage?.map((item, index) => (
                  <div key={`${item.alt}-${index}`}>
                    <div className="navigattionTabs-tab navigattionTabs-tab--mobile">
                      <div className="section-center">
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
                              <p className="block-description">
                                {item.description}
                              </p>
                              <Link
                                style={{
                                  backgroundColor: item.buttonBackground,
                                  color: item.buttonTextColor,
                                }}
                                to={item.href}
                                className="block-selection"
                                title={item.title}
                                onClick={() => {
                                  EventPromoClick(
                                    item.alt,
                                    `NavigationTabs-Home`
                                  )
                                }}
                              >
                                {item.buttonText
                                  ? item.buttonText
                                  : 'Ver todos os presentes'}
                              </Link>
                              <div className="block-border" />
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
                              title={item.title}
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
                    </div>
                  </div>
                ))}
              </>
            }
          </List>
        </div>
      </div>
    </div>
  )
}

export default BlockMobile
