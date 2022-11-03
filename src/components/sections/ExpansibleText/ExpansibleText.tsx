import React, { useState } from 'react'

import './expansible-text.scss'

type ExpansibleTextProps = {
  title?: string
  subtitle?: string
  text: string
  texthidden: string
}

function ExpansibleText({
  title,
  subtitle,
  text,
  texthidden,
}: ExpansibleTextProps) {
  const [showText, setShowText] = useState<boolean>(false)

  const viewMore = () => setShowText(!showText)

  return (
    <>
      <div className="expansible-text-container">
        <h1 className="expansible-text-title">{title ?? ''}</h1>
        <h2 className="expansible-text-subtitle">{subtitle ?? ''}</h2>
        <p className="expansible-text-main-title">
          {text}
          <br />
          {showText && (
            <p className="expansible-text-hidden" id="text-hidden">
              {texthidden}
            </p>
          )}
          <br />
          <button
            onClick={viewMore}
            className="btn-expansible-text"
            id="view-more"
          >
            {showText ? 'Ver menos' : 'Ver mais'}
          </button>
        </p>
      </div>
    </>
  )
}

export default ExpansibleText
