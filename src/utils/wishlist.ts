export const isProductOnWishlist = (id: string, wishlistArray: Wishlist[]) => {
  const allProductsOnWishlist = wishlistArray
    .map((list) => list.productList)
    .flat()

  return allProductsOnWishlist.some((product) => product.productId === id)
}

export const getWishlistIndexById = (
  wishlist: Wishlist,
  wishlistArray: Wishlist[]
) => {
  return wishlistArray.findIndex((list) => list.id === wishlist.id)
}
