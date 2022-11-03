import React from 'react'
import type { RawDraftContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'

import './RichTextFeatured.scss'

interface Props {
  id?: string
  background: string
  textcolor: string
  content: string
}

const RichTextFeatured = ({ id, background, textcolor, content }: Props) => {
  const parsedContent = JSON.parse(content) as RawDraftContentState
  const result = draftToHtml(parsedContent)

  return (
    <div
      style={{
        color: textcolor,
        backgroundColor: background,
      }}
      id={id}
      className="rich-text-featured-component"
      dangerouslySetInnerHTML={{ __html: result }}
    />
  )
}

export default RichTextFeatured
