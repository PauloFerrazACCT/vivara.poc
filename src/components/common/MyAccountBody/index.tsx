import React from 'react'
import { Link } from 'gatsby'
import { ArrowLeftIcon } from 'src/images/svg/components/ArrowIcons'
import CloseIcon from 'src/images/svg/icon-close-pink'
import './styles.scss'

interface MyAccountBodyProps {
  title: string
  onIconClickAnchor: string
  iconType: 'close' | 'return'
  moreActions?: JSX.Element
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any
}

function MyAccountBody({
  title,
  onIconClickAnchor,
  iconType,
  moreActions,
  children,
}: MyAccountBodyProps) {
  return (
    <div className="my-account-area">
      <div className="my-account-area__container">
        <div className="my-account-area__top">
          <div className="my-account-area__title">
            <Link
              className={iconType === 'close' ? '' : 'show-on-desktop-btn'}
              to={onIconClickAnchor}
              aria-label={iconType === 'close' ? 'Fechar' : 'Retornar'}
            >
              {iconType === 'close' ? <CloseIcon /> : <ArrowLeftIcon />}
            </Link>
            <h1>{title}</h1>
          </div>
          {moreActions ?? <></>}
        </div>
        {children}
      </div>
    </div>
  )
}

export default MyAccountBody
