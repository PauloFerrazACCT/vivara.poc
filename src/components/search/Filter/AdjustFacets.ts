import type { IStoreSelectedFacet } from '@generated/graphql'

export const AdjustFacets = (selectedFacets: IStoreSelectedFacet[]) => {
  const selectedFacets2: IStoreSelectedFacet[] = []

  for (const facet of selectedFacets) {
    if (facet.value.indexOf(',') !== -1) {
      for (const facet2 of facet.value.split(',')) {
        selectedFacets2.push({ key: facet.key, value: facet2 })
      }
    } else {
      selectedFacets2.push({ key: facet.key, value: facet.value })
    }
  }

  return selectedFacets2
}
