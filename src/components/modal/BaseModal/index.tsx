import React from 'react'
import type { ModalProps } from '@faststore/ui'
import { Modal } from '@faststore/ui'
import IconButton from 'src/components/ui/VivaraIconButton'
import CloseIcon from 'src/images/svg/icon-close'

import './styles.scss'

interface BaseModalProps extends ModalProps {
  isOpen: boolean
  onCloseButtonClick: () => void
}

function BaseModal({
  isOpen,
  onCloseButtonClick,
  children,
  className = '',
  ...props
}: BaseModalProps) {
  return (
    <>
      <Modal className={`${className} base-modal`} isOpen={isOpen} {...props}>
        <IconButton
          icon={<CloseIcon />}
          aria-label="Close"
          onClick={onCloseButtonClick}
          isCloseButton
        />
        {children}
      </Modal>
    </>
  )
}

export default BaseModal
