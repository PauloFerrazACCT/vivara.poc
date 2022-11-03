import type { ReactNode } from 'react'
import React from 'react'
import type { ButtonProps } from '@faststore/ui'

import './IconButton.module.scss'

interface IIconButton extends ButtonProps {
  icon: ReactNode
  'aria-label': string
  isCloseButton?: boolean
}

function IconButton({
  icon,
  children,
  isCloseButton = false,
  ...props
}: IIconButton) {
  return (
    <button
      data-custom-icon-button
      data-custom-icon-button-close={isCloseButton}
      {...props}
    >
      {icon}
      {children}
    </button>
  )
}

export default IconButton
