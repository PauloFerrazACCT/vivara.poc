import { Button } from '@faststore/ui'
import React, { useState } from 'react'
import type { RawDraftContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import MenuPinkArrowUpIcon from 'src/components/icons/MenuPinkArrowUp'
import MenuPinkArrowDownIcon from 'src/components/icons/MenuPinkArrowDown'

import './read-more.scss'

interface Props {
  title: string
  subtitle?: string
  subtitleh3?: string
  text: string
  buttonShow?: string
  buttonHidden?: string
}

const ReadMore = ({
  title,
  subtitle,
  subtitleh3,
  text,
  buttonShow,
  buttonHidden,
}: Props) => {
  const parsedContent = JSON.parse(text) as RawDraftContentState
  const result = draftToHtml(parsedContent)

  const [isReadMore, setIsReadMore] = useState(true)

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore)
  }

  const buttonTextShow =
    buttonShow && buttonShow !== '' ? buttonShow : 'Ver mais'

  const ButtonTextHidden =
    buttonHidden && buttonHidden !== '' ? buttonHidden : 'Ver menos'

  return (
    <div className="read-more-text">
      <h1>{title}</h1>
      <div>
        {isReadMore ? (
          ''.slice(0, 0)
        ) : (
          <>
            {subtitle && subtitle !== '' ? <h2>{subtitle}</h2> : <></>}
            {subtitleh3 && subtitleh3 !== '' ? <h3>{subtitleh3}</h3> : <></>}
            <div
              className="read-more-text__content"
              dangerouslySetInnerHTML={{ __html: result }}
            />
          </>
        )}
        <div className="read-more-text__flex">
          <Button onClick={toggleReadMore} className="read-or-hide">
            {isReadMore ? buttonTextShow : ButtonTextHidden}
          </Button>
          <Button onClick={toggleReadMore} className="read-or-hideIco">
            {isReadMore ? <MenuPinkArrowDownIcon /> : <MenuPinkArrowUpIcon />}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ReadMore
