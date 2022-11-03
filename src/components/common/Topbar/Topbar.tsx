import React from 'react'
import type { FC } from 'react'
import { Link, Button } from '@faststore/ui'
import Carousel from 'src/components/ui/Carousel'

import CloseIcon from '../../icons/Close'
import './topbar.scss'

interface Props {
  isTopBarVisible: boolean
  setIsTopBarVisible: (value: boolean) => void
  variant: string
  content?: TopbarItem[]
}

export type TopbarItem = {
  label: string
  link?: string
}

const Topbar: FC<Props> = ({
  setIsTopBarVisible,
  isTopBarVisible,
  variant,
  content,
}) => {
  const handleClose = () => {
    setIsTopBarVisible(false)
  }

  const itemsWithLink = content?.map((i: TopbarItem, idx) =>
    i.link ? (
      <Link key={idx} href={i.link} data-topbar-item>
        {i.label}
      </Link>
    ) : (
      <p data-topbar-item>{i.label}</p>
    )
  )

  const controlVisibilityClassname = isTopBarVisible
    ? {
        display: 'flex',
        width: '100%',
      }
    : {
        display: 'none',
        width: '100%',
      }

  return (
    <div style={controlVisibilityClassname}>
      <div className={`topbar-wrapper-${variant}`}>
        <div className="topbar-content-wrapper">
          <Carousel autoplay id="topbar-carousel" infiniteMode>
            {itemsWithLink}
          </Carousel>
          <Button
            aria-label="close topbar button"
            className="topbar-close-button"
            onClick={handleClose}
          >
            <CloseIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Topbar
