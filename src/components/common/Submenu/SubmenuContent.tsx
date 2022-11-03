/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import type { FC } from 'react'
import React, { Suspense } from 'react'

import '../Footer/footer.scss'

interface Props {
  items: Item[]
  onMouseOver?: () => void
  onMouseOut?: () => void
}

interface Item {
  label: string
  link: string
}

const submenuContent: FC<Props> = ({ items, onMouseOver, onMouseOut }) => {
  const map = items?.map(({ label: itemLabel, link }, key: number) => {
    return (
      <a key={key} href={link} className="link-footer">
        <span> {itemLabel}</span>
      </a>
    )
  })

  return (
    <Suspense fallback={<div>Loading... </div>}>
      <nav
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        className="link-footer"
      >
        {map}
      </nav>
    </Suspense>
  )
}

export default submenuContent
