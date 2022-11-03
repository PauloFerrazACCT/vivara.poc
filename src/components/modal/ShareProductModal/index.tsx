import { Link } from 'gatsby'
import React, { useEffect, useState } from 'react'
import ShareFacebook from 'src/components/icons/ShareFacebook'
import ShareTwitter from 'src/components/icons/ShareTwitter'
import ShareWhatsapp from 'src/components/icons/ShareWhatsapp'

import BaseModal from '../BaseModal'
import './styles.scss'

interface ShareProductModalProps {
  setIsShareModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  isShareModalOpen: boolean
  productUrl: string
}

const ShareProductModal = ({
  setIsShareModalOpen,
  isShareModalOpen,
  productUrl,
}: ShareProductModalProps) => {
  const [isButtonClicked, setIsButtonClicked] = useState(false)

  const handleCloseModal = () => {
    setIsShareModalOpen(false)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(productUrl)
    setIsButtonClicked(!isButtonClicked)
  }

  useEffect(() => {
    if (isButtonClicked) {
      const timer = setTimeout(() => {
        setIsButtonClicked(!isButtonClicked)
      }, 3000)

      return () => clearTimeout(timer)
    }

    return undefined
  }, [isButtonClicked])

  return (
    <BaseModal onCloseButtonClick={handleCloseModal} isOpen={isShareModalOpen}>
      <div className="share-product-modal__container">
        <p className="share-product-modal__title">Compartilhe este produto</p>
        <div className="share-product-modal__link-container">
          <input
            className="share-product-modal__link"
            value={productUrl}
            disabled
          />
        </div>

        <button
          className={
            !isButtonClicked ? 'copyLinkButton' : 'copyLinkButtonClicked'
          }
          onClick={handleCopyLink}
        >
          {!isButtonClicked ? ' COPIAR LINK' : 'COPIADO'}
        </button>

        <div className="share-product-modal__social-media">
          Compartilhe nas redes
          <div className="share-product-modal__social-media-icons">
            <Link
              target="_blank"
              to={`https://www.facebook.com/sharer.php?u=${productUrl}`}
              rel="noreferrer"
            >
              <ShareFacebook />
            </Link>
            <Link
              target="_blank"
              to={`http://twitter.com/share?text=Confira este produto:&hashtags=Vivara&url=${productUrl}`}
              rel="noreferrer"
            >
              <ShareTwitter />
            </Link>
            <Link
              target="_blank"
              to={`https://api.whatsapp.com/send?text=Confira este produto:${productUrl}`}
              rel="noreferrer"
            >
              <ShareWhatsapp />
            </Link>
          </div>
        </div>
      </div>
    </BaseModal>
  )
}

export default ShareProductModal
