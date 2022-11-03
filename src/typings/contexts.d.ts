interface UserContextProps {
  user: User | null
}

interface User {
  id?: string
  email?: string
  givenName?:string
  familyName?:string
}

interface NotificationContextProps {
  isShowing: boolean
  getNotificationProps: NotificationProps
  showNotificaton: (text: string, state?: 'sucess' | 'danger') => void
  hideNotificaton: () => void
}

interface WishlistContextProps {
  lists: Wishlist[]
  currentWishlist: Wishlist
  getLists: () => Promise<void>
  createWishlist: (name: string, isDefault?: boolean) => void
  deleteWishlist: () => Promise<void>
  changeWishlistName: (newName: string) => Promise<void>
  updateCurrentWishlist: (list?: Wishlist) => void
  deleteProduct: (productIndex: number) => Promise<void>
  moveWishlistProduct: (
    productIndex: number,
    wishlistIndex: number
  ) => Promise<void>
  addProductToWishlist: (
    productId: string,
    chosenOption: number
  ) => Promise<void>
  removeProductFromWishlist: (productId: string) => Promise<void>
  changeWishlistProductSize: (
    productIndex: number,
    newSize: number
  ) => Promise<void>
}

interface MeasureContextProps {
  measures: Hands
  getMeasures: () => Promise<void>
  editMeasure: (side: HandSide, fingerIndex: FingerId, phalangeIndex: number, newMeasure?: number) => Promise<void>
  deleteAllFingerMeasures: (side: HandSide, fingerIndex: FingerId) => Promise<void>
  updateMeasures: (value: Hands) => Promise<void>
}

