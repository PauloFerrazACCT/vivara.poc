import React, { useEffect, useState } from 'react'

import './styles.scss'
import DesktopComponent from './DesktopComponent'
import MobileComponent from './MobileComponent'

type ThemeNavigationProps = {
  src: string
  href: string
  alt: string
  label: string
  style?: string
}
type Props = {
  banners: ThemeNavigationProps[]
  title: string
  description: string
}
function ThemeNavigation({ banners, title, description }: Props) {
  const [style, setStyle] = useState('')

  useEffect(() => {
    window.location.pathname === '/categoria/life' && setStyle('life')
  }, [])

  return (
    <div className="theme-navigation-container">
      <div className="theme-navigation-header">
        <div className={`theme-navigation-title ${style}`}>
          <h2>{title}</h2>
        </div>
        <div className="theme-navigation-description">
          <p>{description}</p>
        </div>
        <div className="theme-navigation-description-border" />
        <div className="mobile-container">
          <MobileComponent banners={banners} />
        </div>
        <div className="desktop-container">
          <DesktopComponent banners={banners} />
        </div>
      </div>
    </div>
  )
}

export default ThemeNavigation
