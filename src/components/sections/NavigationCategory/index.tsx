import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { Image } from 'src/components/ui/Image'
import { EventPromoClick } from 'src/components/common/EventPromoClick'
import './styles.scss'
import { PromoView } from 'src/components/common/PromoView'

type NavigationCategoryProps = {
  src: string
  href: string
  alt: string
  label: string
}
type Props = {
  banners: NavigationCategoryProps[]
  id?: string
  background?: string
  textcolor?: string
  title?: string
  subtitle?: string
  variant?: string
}
function NavigationCategory({
  banners,
  title,
  subtitle,
  variant,
  id,
  background,
  textcolor,
}: Props) {
  const [style, setStyle] = useState('')
  const [altForEvent, setAltForEvent] = useState<string>('')

  useEffect(() => {
    window.location.pathname === '/categoria/life' && setStyle('life')
  }, [])

  const categoryClass = variant
    ? `navigation-category-${variant}`
    : 'navigation-category'

  const { AddPromoView } = PromoView({
    altForEvent,
    identifier: 'navigation-category-home',
  })

  return (
    <div
      id={id}
      className={`${categoryClass}-container home-navigationcategory`}
      style={{ backgroundColor: background }}
    >
      {
        <>
          <div className={`${categoryClass}-description`}>
            <div className={`${categoryClass}-title ${style}`}>
              <h2 style={{ color: textcolor }}>{title}</h2>
            </div>
            <div
              className={`${categoryClass}-subtitle home-navigationcategory-title ${style}`}
            >
              <p style={{ color: textcolor }}>{subtitle}</p>
            </div>
            <div className={`${categoryClass}-description-border ${style}`} />
          </div>
          {AddPromoView()}
          <div
            className={`${categoryClass}-items home-navigationcategory-items`}
          >
            <div
              className={`${categoryClass}-images home-navigationcategory-images`}
            >
              {banners?.map((item, index) => (
                <Link
                  to={item.href}
                  aria-label={`link para a coleção ${item.alt}`}
                  key={item.alt}
                  className={`${categoryClass}-link-area ${style}`}
                  onClick={() => {
                    EventPromoClick(item.alt, `NavigationCategory-Home`)
                  }}
                >
                  <Image
                    baseUrl={item.src}
                    alt={`${item.alt}${index}`}
                    aspectRatio={1}
                    layout="constrained"
                    backgroundColor="#F0F0F0"
                    loading="eager"
                    options={{
                      fitIn: true,
                    }}
                    setAltForEvent={setAltForEvent}
                  />
                  <h3 style={{ color: textcolor }}>{item.label}</h3>
                </Link>
              ))}
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default NavigationCategory
