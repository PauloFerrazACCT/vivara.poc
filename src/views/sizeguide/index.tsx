import React from 'react'
import MeasuresContainer from 'src/components/size-guide/MeasuresContainer'
import SizeGuideMenu from 'src/components/size-guide/MeasuresMenu.tsx'

import './styles.scss'

const SizeGuidePage = () => {
  return (
    <div className="sizeguide-page__container">
      <aside className="sizeguide-page__aside">
        <SizeGuideMenu />
      </aside>
      <MeasuresContainer />
    </div>
  )
}

export default SizeGuidePage
