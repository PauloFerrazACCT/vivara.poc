import React from 'react'
import Button from 'src/components/ui/VivaraButton'

import BaseModal from '../BaseModal'

import './styles.scss'

interface ConfirmationModalProps {
  headerText: string
  bodyText: string
  confirmText: string
  denyText: string
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setWasListDeleted?: React.Dispatch<React.SetStateAction<boolean>>
  onConfirmAction: () => void
  onCloseAction?: () => void
}

function ConfirmationModal({
  headerText,
  bodyText,
  confirmText,
  denyText,
  isOpen,
  onCloseAction,
  setIsOpen,
  onConfirmAction,
  setWasListDeleted,
}: ConfirmationModalProps) {
  const onConfirmButtonClick = () => {
    onConfirmAction()
    setIsOpen(false)

    if (setWasListDeleted) {
      setWasListDeleted(true)
    }
  }

  const onCloseButtonClick = () => {
    onCloseAction?.()
    setIsOpen(false)
  }

  return (
    <BaseModal isOpen={isOpen} onCloseButtonClick={onCloseButtonClick}>
      <h5 className="confirmation-modal__header">{headerText}</h5>
      <p className="confirmation-modal__body">{bodyText}</p>
      <div className="confirmation-modal__btn-container">
        <Button variant="dark" onClick={onConfirmButtonClick}>
          {confirmText}
        </Button>
        <Button variant="outlined" onClick={onCloseButtonClick}>
          {denyText}
        </Button>
      </div>
    </BaseModal>
  )
}

export default ConfirmationModal
