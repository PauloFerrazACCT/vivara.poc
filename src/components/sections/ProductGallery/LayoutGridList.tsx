import React from 'react'

import './product-gallery.scss'

interface Props {
  layout: string
  handleChangeLayout: (value: string) => void
}

const LayoutGridList = ({ layout, handleChangeLayout }: Props) => {
  return (
    <div className="button-layout-product-grid">
      <button
        className={`grid-layout ${
          layout === 'grid' ? 'grid-layout-active-color' : ''
        }`}
        onClick={() => handleChangeLayout('grid')}
      />
      <button
        className={`list-layout ${
          layout === 'list' ? 'list-layout-active-color' : ''
        }`}
        onClick={() => handleChangeLayout('list')}
      />
    </div>
  )
}

export default LayoutGridList
