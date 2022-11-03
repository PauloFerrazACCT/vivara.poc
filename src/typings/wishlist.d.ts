interface WishlistProduct {
  productId: string
  size?: number
}

interface Wishlist {
  id: string
  name: string
  productList: WishlistProduct[]
  isDefault: boolean
}
