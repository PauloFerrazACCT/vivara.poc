import React, { useRef, useState } from 'react'
import { List } from '@faststore/ui'
import Slider from 'react-slick'
import ArrowLeftIcon from 'src/images/svg/icon-arrow-left-black'
import ArrowRightIcon from 'src/images/svg/icon-arrow-right-black'
import { Link } from 'gatsby'
import { Image } from 'src/components/ui/Image'
import { EventPromoClick } from 'src/components/common/EventPromoClick'
import { PromoView } from 'src/components/common/PromoView'

import type { Props } from './index'

import 'slick-carousel/slick/slick.scss'
import 'slick-carousel/slick/slick-theme.scss'

const sliderSettings = {
  arrows: false,
  dots: false,
  infinite: false,
  slidesToShow: 1,
  className: 'itemNavigattionTabs',
}

const handleEventPromoClick = (item: any) => {
  EventPromoClick(item.alt, `NavigationTabs-Home`)
}

function BlockMobile({ navigattionTabs }: Props) {
  const sliderRef = useRef<any>(null)
  const [altForEvent, setAltForEvent] = useState<string>('')

  const { AddPromoView } = PromoView({
    altForEvent,
    identifier: 'navigation-tabs-home',
  })

  return (
    <div className="navigattionTabs-container">
      <h2 className="navigattionTabs-title">Momentos Inesquecíveis</h2>
      <p className="navigattionTabs-subtitle">
        Joias perfeitas para cada ocasião
      </p>
      <div className="navigattionTabs-subtitle--border" />
      <div className="section-top">
        <div className="navigattionTabs-list">
          <List variant="unordered">
            {
              <>
                <li className="tab-arrows">
                  <button
                    aria-label="arrow-left"
                    className="tab-arrows-prev"
                    onClick={() => sliderRef.current.slickPrev()}
                  >
                    <ArrowLeftIcon />
                  </button>
                  <button
                    aria-label="arrow-right"
                    className="tab-arrows-next"
                    onClick={() => sliderRef.current.slickNext()}
                  >
                    <ArrowRightIcon />
                  </button>
                </li>
                {AddPromoView()}
                <Slider ref={sliderRef} {...sliderSettings}>
                  {navigattionTabs?.map((item, index) => (
                    <div key={`${item.alt}-${index}`}>
                      <div className="navigattionTabs-tab navigattionTabs-tab--mobile">
                        <div className="navigattionTabs-btn navigattionTabs-btn--mobile">
                          {item.tabLabel}
                        </div>
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
                                  to={item.href}
                                  className="block-selection"
                                  title={item.title}
                                  onClick={() => {
                                    handleEventPromoClick(item)
                                  }}
                                >
                                  Ver todos os presentes
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
                                to={item.href}
                                className="block-link"
                                title={item.title}
                                onClick={() => {
                                  handleEventPromoClick(item)
                                }}
                              >
                                Ver todos os presentes
                              </Link>
                              <div className="block-border" />
                            </div>
                          </article>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </>
            }
          </List>
        </div>
      </div>
    </div>
  )
}

export default BlockMobile
