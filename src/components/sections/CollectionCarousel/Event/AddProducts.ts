import type { ProductSummary_ProductFragment } from '@generated/graphql'

export const addProductOnReducer = (
  productsDataToEvent: ProductSummary_ProductFragment[] | undefined,
  isVisible: boolean,
  product: ProductSummary_ProductFragment,
  dispatcher: React.Dispatch<any> | undefined
) => {
  const haveProduct = productsDataToEvent?.some(({ name }: { name: string }) =>
    name.includes(product.name)
  )

  if (!haveProduct && isVisible && dispatcher) {
    dispatcher({ type: 'ADD', payload: product })
  }
}
