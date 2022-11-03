import React, { useRef } from 'react'
import { Link } from 'gatsby'
import { Image } from 'src/components/ui/Image'
import './styles.scss'
import Slider from 'react-slick'
import sliderSettings from 'src/configs/slider-theme-navigation'
import { EventPromoClick } from 'src/components/common/EventPromoClick'
import 'slick-carousel/slick/slick.scss'
import 'slick-carousel/slick/slick-theme.scss'

type ThemeNavigationProps = {
  src: string
  href: string
  alt: string
  label: string
}
type Props = {
  banners: ThemeNavigationProps[]
}
function MobileThemeNavigation({ banners }: Props) {
  const sliderRef = useRef<any>(null)

  return (
    <div className="theme-navigation-items">
      <Slider ref={sliderRef} {...sliderSettings}>
        {banners?.map((item) => (
          <Link
            to={item.href}
            aria-label={`link para o tema ${item.alt}`}
            key={item.alt}
            className="theme-navigation-link-area"
            onClick={() => {
              EventPromoClick(item.alt, `NavigationTheme-Home`)
            }}
          >
            <Image
              baseUrl={item.src}
              alt={item.alt}
              aspectRatio={1}
              layout="constrained"
              backgroundColor="#F0F0F0"
              loading="eager"
              options={{
                fitIn: true,
              }}
            />
            <h3>{item.label}</h3>
          </Link>
        ))}
      </Slider>
    </div>
  )
}

export default MobileThemeNavigation
