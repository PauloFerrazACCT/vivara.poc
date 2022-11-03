import React from 'react'
import { Link } from 'gatsby'
import { Image } from 'src/components/ui/Image'
import './navigation-images-buttons.scss'

type NavigationImagesButtonsProps = {
  src: string
  href: string
  alt: string
}
type Props = {
  banners: NavigationImagesButtonsProps[]
  id?: string
  background?: string
  textcolor?: string
  title?: string
  subtitle?: string
}
function NavigationImagesButtons({
  banners,
  id,
  background,
  textcolor,
  title,
  subtitle,
}: Props) {
  return (
    <div
      className="navigation-images-buttons-container"
      id={id}
      style={{
        backgroundColor: background,
      }}
    >
      <div className="navigation-images-buttons-container__description">
        <div className="navigation-images-buttons-container__title">
          <h2
            style={{
              color: textcolor,
            }}
          >
            {title}
          </h2>
        </div>
        <div className="navigation-images-buttons-container__subtitle">
          <p
            style={{
              color: textcolor,
            }}
          >
            {subtitle}
          </p>
        </div>
        <div className="navigation-images-buttons-container__description-border" />
      </div>
      <div className="navigation-images-buttons-container__items">
        <div className="navigation-images-buttons-container__images">
          {banners?.map((item, index) => (
            <Link
              to={item.href}
              aria-label={`link para a coleção ${item.alt}`}
              key={item.alt}
              className="navigation-images-buttons-container__link-area"
            >
              <Image
                baseUrl={item.src}
                alt={`${item.alt}${index}`}
                aspectRatio={1}
                layout="constrained"
                backgroundColor={background}
                loading="eager"
                options={{
                  fitIn: true,
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NavigationImagesButtons
