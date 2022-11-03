/* eslint-disable react-hooks/exhaustive-deps */
import type { FC } from 'react'
import React, { useEffect, useState, useContext, createContext } from 'react'
import axios from 'axios'
import { deepObjectCopy } from 'src/utils'
import { getWishlistIndexById, isProductOnWishlist } from 'src/utils/wishlist'

import { useNotificationContext } from './notification-context'
import { useUserContext } from './user-context'

const WishlistContext = createContext<WishlistContextProps>(
  {} as WishlistContextProps
)

export const WishlistProvider: FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [lists, setLists] = useState<Wishlist[]>([])
  const [currentWishlist, setCurrentWishlist] = useState<Wishlist>(
    {} as Wishlist
  )

  const { showNotificaton } = useNotificationContext()
  const { user } = useUserContext()

  const getLists = async () => {
    if (!user?.id || lists.length) {
      return
    }

    const { data } = await axios.get('/api/wishlist/getWishlists', {
      params: {
        userId: user?.id,
      },
    })

    if (!data.length) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      await createWishlist('Meus Favoritos', true)
    } else {
      setLists(data)
    }
  }

  useEffect(() => {
    getLists()
  }, [user])

  const createWishlist = async (title: string, isDefault = false) => {
    const newList = { name: title, productList: [], isDefault }

    const { data } = await axios.post('/api/wishlist/addWishlist', {
      wishlist: JSON.stringify({ userId: user?.id, ...newList }),
    })

    setLists([...lists, { id: data.DocumentId, ...newList }])
  }

  const deleteWishlist = async () => {
    await axios.delete('/api/wishlist/deleteWishlist', {
      data: {
        id: currentWishlist.id,
      },
    })
    showNotificaton('Lista excluída com sucesso!')

    const listsCopy: Wishlist[] = [...lists]

    const updatedList = listsCopy.filter(
      (wishlist) => wishlist.id !== currentWishlist.id
    )

    setLists(updatedList)
  }

  const updateList = async (newList: Wishlist) => {
    await axios.patch('/api/wishlist/editWishlist', {
      wishlist: {
        userId: user?.id,
        id: newList.id,
        name: newList.name,
        productList: newList.productList,
        isDefault: newList.isDefault,
      },
    })
  }

  const updateCurrentWishlist = (list?: Wishlist) => {
    if (list) {
      setCurrentWishlist(list)
    } else {
      setCurrentWishlist({} as Wishlist)
    }
  }

  const changeWishlistName = async (newName: string) => {
    const currentWishlistCopy: Wishlist = { ...currentWishlist }

    currentWishlistCopy.name = newName

    await updateList(currentWishlistCopy)

    const wishlistId = getWishlistIndexById(currentWishlistCopy, lists)

    const listsCopy: Wishlist[] = [...lists]

    listsCopy[wishlistId] = currentWishlistCopy
    setLists(listsCopy)
  }

  const deleteProduct = async (productIndex: number) => {
    const wishlistCopy: Wishlist = deepObjectCopy(currentWishlist)
    const wishlistWithProductDeleted = wishlistCopy.productList.filter(
      (_product, index) => index !== productIndex
    )

    wishlistCopy.productList = wishlistWithProductDeleted

    const listsCopy: Wishlist[] = [...lists]
    const currentWishlistIndex = getWishlistIndexById(currentWishlist, lists)

    listsCopy[currentWishlistIndex].productList = wishlistWithProductDeleted
    await updateList(listsCopy[currentWishlistIndex])
    showNotificaton('Produto removido da lista com sucesso!')
    setCurrentWishlist(listsCopy[currentWishlistIndex])
    setLists(listsCopy)
  }

  const moveWishlistProduct = async (
    productIndex: number,
    wishlistIndex: number
  ) => {
    const listsCopy: Wishlist[] = [...lists]
    const product = currentWishlist.productList[productIndex]

    await deleteProduct(productIndex)
    listsCopy[wishlistIndex].productList.push(product)
    await updateList(listsCopy[wishlistIndex])
    showNotificaton('Produto removido da lista com sucesso!')
    setLists(listsCopy)
  }

  const addProductToWishlist = async (
    productId: string,
    chosenOption: number
  ) => {
    const listsCopy: Wishlist[] = [...lists]

    listsCopy[chosenOption].productList.push({ productId })

    await updateList(listsCopy[chosenOption])
    showNotificaton('Produto adicionado à lista com sucesso!')

    setLists(listsCopy)
  }

  const removeProductFromWishlist = async (productId: string) => {
    let wishlist: Wishlist = {} as Wishlist
    const listsCopy = [...lists]

    for (const list of listsCopy) {
      const isOnThisWishlist = isProductOnWishlist(productId, [list])

      if (isOnThisWishlist) {
        wishlist = list
      }
    }

    const updatedProductList = wishlist.productList.filter(
      (product) => product.productId !== productId
    )

    const wishlistIndex = getWishlistIndexById(wishlist, lists)

    listsCopy[wishlistIndex].productList = updatedProductList
    await updateList(listsCopy[wishlistIndex])

    window.postMessage({
      name: 'AnalyticsEvent',
      params: {
        name: 'store:remove_wish_list',
        params: {
          productId,
        },
      },
    })

    showNotificaton('Produto removido da lista com sucesso!')
    setLists(listsCopy)
  }

  const changeWishlistProductSize = async (
    productIndex: number,
    newSize: number
  ) => {
    const listsCopy: Wishlist[] = [...lists]
    const product = currentWishlist.productList[productIndex]

    product.size = newSize

    const currentWishlistIndex = getWishlistIndexById(currentWishlist, lists)

    listsCopy[currentWishlistIndex].productList[productIndex] = product
    await updateList(listsCopy[currentWishlistIndex])
    setLists(listsCopy)
  }

  return (
    <WishlistContext.Provider
      value={{
        lists,
        currentWishlist,
        getLists,
        createWishlist,
        deleteWishlist,
        updateCurrentWishlist,
        changeWishlistName,
        deleteProduct,
        moveWishlistProduct,
        addProductToWishlist,
        removeProductFromWishlist,
        changeWishlistProductSize,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlistContext = () => {
  return useContext(WishlistContext)
}
