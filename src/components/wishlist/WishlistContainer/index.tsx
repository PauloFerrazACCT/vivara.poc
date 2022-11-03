import React, { useEffect, useState } from 'react'
import { useWishlistContext } from 'src/contexts/wishlist-context'
import { useNotificationContext } from 'src/contexts/notification-context'
import IconButton from 'src/components/ui/VivaraIconButton'
import SingleInputModal from 'src/components/modal/SingleInputModal'
import MyAccountBody from 'src/components/common/MyAccountBody'
import WishlistCard from 'src/components/wishlist/WishlistCard'
import PlusOutlineIcon from 'src/images/svg/icon-plus-outline'

import './styles.scss'

interface CreateWishlistButtonProps {
  setIsCreateWishlistModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function CreateWishlistButton({
  setIsCreateWishlistModalOpen,
}: CreateWishlistButtonProps) {
  return (
    <IconButton
      aria-label="Criar lista"
      icon={<PlusOutlineIcon />}
      className="create-wishlist-btn"
      onClick={() => setIsCreateWishlistModalOpen(true)}
    >
      Criar lista
    </IconButton>
  )
}

function WishlistContainer() {
  const { lists, createWishlist } = useWishlistContext()
  const { isShowing, hideNotificaton } = useNotificationContext()
  const [isCreateWishlistModalOpen, setIsCreateWishlistModalOpen] =
    useState(false)

  useEffect(() => {
    return () => {
      if (isShowing) {
        hideNotificaton()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowing])

  return (
    <MyAccountBody
      title="Meus Favoritos"
      onIconClickAnchor="/"
      iconType="close"
      moreActions={
        <CreateWishlistButton
          setIsCreateWishlistModalOpen={setIsCreateWishlistModalOpen}
        />
      }
    >
      <div className="wishlist-list">
        {lists?.map((list) => (
          <WishlistCard key={list.id} list={list} />
        ))}
      </div>
      {isCreateWishlistModalOpen && (
        <SingleInputModal
          title="Dê um nome para sua lista"
          btnText="Salvar"
          isOpen={isCreateWishlistModalOpen}
          setIsOpen={setIsCreateWishlistModalOpen}
          modalAction={createWishlist}
        />
      )}
    </MyAccountBody>
  )
}

export default WishlistContainer
