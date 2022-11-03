import React, { useState } from 'react'
import { Input } from '@faststore/ui'
import { useFormik } from 'formik'
import Button from 'src/components/ui/VivaraButton'
import { useWishlistContext } from 'src/contexts/wishlist-context'

import BaseModal from '../BaseModal'

import './styles.scss'

interface SingleInputModalProps {
  title: string
  placeholder?: string
  btnText: string
  isOpen: boolean
  isNewList?: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setIsSaveProductModalOpen?: React.Dispatch<React.SetStateAction<boolean>>
  inputText?: string
  setHasNameChanged?: React.Dispatch<React.SetStateAction<boolean>>
  setInputText?: React.Dispatch<React.SetStateAction<string>>
  onClose?: () => void
  modalAction: (name: string) => void
}

interface FormikProps {
  inputText: string
}

function SingleInputModal({
  title,
  placeholder = 'Nome',
  btnText,
  isOpen,
  isNewList = true,
  setIsOpen,
  inputText,
  setInputText,
  setHasNameChanged,
  modalAction,
  setIsSaveProductModalOpen,
  onClose,
}: SingleInputModalProps) {
  const formik = useFormik({
    initialValues: {
      inputText: inputText ?? '',
    },
    onSubmit: (values: FormikProps) => {
      setInputText?.(values.inputText)
      modalAction(values.inputText)
      onClose?.()
      setIsOpen(false)
    },
  })

  const [notificationMessage, setNotificationMessage] = useState('')

  const { createWishlist, getLists, changeWishlistName, lists } =
    useWishlistContext()

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const checkForExistingList = lists.filter((list) => {
      return list.name.toLowerCase() === formik.values.inputText.toLowerCase()
    })

    if (checkForExistingList.length !== 0) {
      setNotificationMessage('Você já possui uma lista com este nome.')

      return
    }

    if (formik.values.inputText !== '') {
      isNewList
        ? createWishlist(formik.values.inputText, false)
        : changeWishlistName(formik.values.inputText)
    }

    setIsOpen(false)

    getLists()

    if (setHasNameChanged) {
      setHasNameChanged(true)
    }

    if (setIsSaveProductModalOpen) {
      setIsSaveProductModalOpen(true)
    }
  }

  return (
    <BaseModal isOpen={isOpen} onCloseButtonClick={() => setIsOpen(false)}>
      <form onSubmit={handleSubmit}>
        <h5 className="single-input-modal__title">{title}</h5>

        <Input
          placeholder={placeholder}
          className="single-input-modal__input"
          value={formik.values.inputText}
          onChange={formik.handleChange}
          name="inputText"
          required
        />

        {notificationMessage !== '' && (
          <span className="single-input-modal__notification">
            {notificationMessage}
          </span>
        )}
        <Button
          className="single-input-modal__btn"
          disabled={!formik.values.inputText.length}
          type="submit"
        >
          {btnText}
        </Button>
      </form>
    </BaseModal>
  )
}

export default SingleInputModal
