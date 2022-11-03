import type { IStoreSelectedFacet } from '@generated/graphql'

type Props = {
  selectedFacets: IStoreSelectedFacet[]
  minAbsolutePrice?: number
  maxAbsolutePrice?: number
  minPriceSelected?: string
  maxPriceSelected?: string
}

export const ApplyFilters = ({
  selectedFacets,
  minAbsolutePrice,
  maxAbsolutePrice,
  minPriceSelected,
  maxPriceSelected,
}: Props) => {
  let queryStringFilter = ''
  let queryStringFacets = ''
  const term =
    window.location.search.indexOf('?q=') !== -1
      ? window.location.search.split('q=')[1].split('&')[0]
      : ''

  const keyFacets: string[] = []

  if (
    selectedFacets.length === 0 &&
    minPriceSelected === undefined &&
    maxPriceSelected === undefined
  ) {
    window.location.href = term
      ? `${window.location.pathname}?q=${term}&sort=score_desc&page=0`
      : window.location.pathname

    return
  }

  for (const facet of selectedFacets) {
    keyFacets.push(facet.key)
  }

  const keyFacetsFiltered = keyFacets.filter(
    (keyFacet, i) => keyFacets.indexOf(keyFacet) === i
  )

  for (const facet of selectedFacets) {
    queryStringFilter += `${facet.key}=${facet.value}&`
  }

  keyFacetsFiltered.map((keyFacet, i) =>
    keyFacetsFiltered.length - 1 === i
      ? (queryStringFacets += `${keyFacet}&`)
      : (queryStringFacets += `${keyFacet}%2C`)
  )

  const priceFilter =
    minPriceSelected !== undefined || maxPriceSelected !== undefined

  const url = `${window.location.pathname}?${term && `q=${term}&`}${
    priceFilter
      ? `price=${minPriceSelected ?? minAbsolutePrice}-to-${
          maxPriceSelected ?? maxAbsolutePrice
        }&`
      : ''
  }${queryStringFilter}facets=${
    priceFilter ? `price${queryStringFacets === '' ? '&' : '%2C'}` : ''
  }${queryStringFacets}sort=score_desc&page=0`

  window.location.href = url
}
