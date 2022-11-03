/* The objective of this util is to parse the array of categories named itemListElement that is
received in product info into an array of selectedFacets that can be used to filter related products by category. */
type ItemListElement = {
  item: string
  name: string
  position: number
}

function removeEmptyItemsFromList(value: string) {
  return value !== ''
}

export const parseItemListElement = (itemListElement: ItemListElement[]) => {
  const splittedCategoryList =
    itemListElement[itemListElement.length - 2]?.item.split('/')

  const filteredCategoryList = splittedCategoryList.filter(
    removeEmptyItemsFromList
  )

  return filteredCategoryList.map((e, idx) => {
    return { key: `category-${idx + 1}`, value: `${e}` }
  })
}
