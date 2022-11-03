import React from 'react'
import type { RawDraftContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'

import './rich-text-life.scss'

interface Props {
  content: string
}

const RichTextLife = ({ content }: Props) => {
  const parsedContent = JSON.parse(content) as RawDraftContentState
  const result = draftToHtml(parsedContent)

  return (
    <div
      className="rich-text-life-component"
      dangerouslySetInnerHTML={{ __html: result }}
    />
  )
}

export default RichTextLife
