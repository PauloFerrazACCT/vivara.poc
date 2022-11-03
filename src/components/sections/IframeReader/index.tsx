import React from 'react'

interface Props {
  iframe: string
}

const IframeReader = ({ iframe }: Props) => {
  const code = {
    __html: iframe || '',
  }

  if (!iframe) {
    return null
  }

  return (
    <div className="iframe-container">
      <div className="iframe-content" dangerouslySetInnerHTML={code} />
    </div>
  )
}

export default IframeReader
