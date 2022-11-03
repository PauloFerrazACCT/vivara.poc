import React from 'react'

import BlockDesktop from './BlockDesktop'
import BlockMobile from './BlockMobile'
import './styles.scss'

type NavigationTabsProps = {
  src1: string
  src2: string
  href: string
  alt: string
  tabLabel: string
  title: string
  description: string
}

export type Props = {
  navigattionTabs: NavigationTabsProps[]
}

function NavigattionTabs({ navigattionTabs }: Props) {
  return (
    <>
      <div className="block-mobile">
        <BlockMobile navigattionTabs={navigattionTabs} />
      </div>
      <div className="block-desktop">
        <BlockDesktop navigattionTabs={navigattionTabs} />
      </div>
    </>
  )
}

export default NavigattionTabs
