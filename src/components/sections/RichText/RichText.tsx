import React from 'react'
import type { RawDraftContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'

import './rich-text.scss'

interface Props {
  content: string
}

const RichText = ({ content }: Props) => {
  const parsedContent = JSON.parse(content) as RawDraftContentState
  const result = draftToHtml(parsedContent)

  return (
    <div
      className="rich-text-component"
      dangerouslySetInnerHTML={{ __html: result }}
    />
  )
}

export default RichText
