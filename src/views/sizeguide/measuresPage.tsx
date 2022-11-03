import React from 'react'
import FingersContainer from 'src/components/size-guide/FingersContainer'
import SizeGuideMenu from 'src/components/size-guide/MeasuresMenu.tsx'

import './styles.scss'

const MeasuresPage = ({ location }: any) => {
  return (
    <div className="sizeguide-page__container">
      <aside className="sizeguide-page__aside">
        <SizeGuideMenu />
      </aside>
      <FingersContainer side={location?.state?.side} />
    </div>
  )
}

export default MeasuresPage
