import React from 'react'
import { Link } from 'gatsby'
import { Image } from 'src/components/ui/Image'
import { EventPromoClick } from 'src/components/common/EventPromoClick'
import './styles.scss'

type ThemeNavigationProps = {
  src: string
  href: string
  alt: string
  label: string
}
type Props = {
  banners: ThemeNavigationProps[]
}
function DesktopThemeNavigation({ banners }: Props) {
  return (
    <div className="theme-navigation-items">
      <div className="theme-navigation-images">
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
      </div>
    </div>
  )
}

export default DesktopThemeNavigation
