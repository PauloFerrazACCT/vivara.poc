import './styles.scss'
import { Button } from '@faststore/ui'
import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import loadable from '@loadable/component'

import storeConfig from '../../../../store.config'

const BaseModal = loadable(() => import('../BaseModal'))

const MeasuresPdp: FC<Props> = ({ categoryTree }) => {
  const { account } = storeConfig
  const [isOpen, setIsOpen] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [imgUrl, setImgUrl] = useState<string>('')

  useEffect(() => {
    categoryTree.forEach(({ item }) => {
      if (
        item.includes('anel') ||
        item.includes('aneis') ||
        item.includes('aliança')
      ) {
        setShowButton(true)
        setImgUrl('anel_sizeguide.gif')
      }

      if (item.includes('pulseira')) {
        setShowButton(true)
        setImgUrl('pulseira_sizeguide.gif')
      }
    })
  }, [categoryTree])

  const onModalClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      {showButton && (
        <Button
          className="c-measures__button"
          onClick={() => {
            setIsOpen(true)
          }}
        >
          Guia de medidas
        </Button>
      )}

      <BaseModal
        isOpen={isOpen}
        onCloseButtonClick={onModalClose}
        className="c-measures__modal"
      >
        <span className="c-measures__text--title">Descubra seu tamanho</span>
        <div className="c-measures__section">
          <div className="c-measures__image">
            <img
              alt="Guia de medidas"
              src={`http://${account}.vtexassets.com/arquivos/${imgUrl}`}
            />
          </div>
        </div>
      </BaseModal>
    </>
  )
}

export default MeasuresPdp
