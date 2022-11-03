import React from 'react'
import type { ButtonProps } from '@faststore/ui'

import './VivaraButton.module.scss'

interface IButton extends ButtonProps {
  onClick?: any
  variant?: 'normal' | 'dark' | 'outlined'
}

function Button({ variant = 'normal', disabled, children, ...props }: IButton) {
  return (
    <button
      data-custom-button
      data-custom-button-variant={variant}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
