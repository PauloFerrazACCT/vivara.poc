import React from 'react'
import './styles.scss'

type InstitutionalProps = {
  title?: string
  subtitle?: string
}

function InstitutionalTitleandSubtitle({
  title,
  subtitle,
}: InstitutionalProps) {
  return (
    <>
      <div className="institutional-container">
        <h1 className="institutional-page-title">{title ?? ''}</h1>
        <p className="institutional-page-subtitle">{subtitle ?? ''}</p>
      </div>
    </>
  )
}

export default InstitutionalTitleandSubtitle
