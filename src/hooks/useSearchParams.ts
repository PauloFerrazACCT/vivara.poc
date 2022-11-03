import type { SearchState } from '@faststore/sdk'
import { parseSearchState } from '@faststore/sdk'
import type {
  CollectionDynamicPageQueryQuery,
  CollectionPageQueryQuery,
  ServerCollectionPageQueryQuery,
  CollectionPageQueryQueryVariables,
} from '@generated/graphql'
import type { PageProps } from 'gatsby'
import { useMemo } from 'react'

import { AdjustFacets } from '../components/search/Filter/AdjustFacets'

export type Props = PageProps<
  CollectionPageQueryQuery,
  CollectionPageQueryQueryVariables,
  unknown,
  ServerCollectionPageQueryQuery | null
> & { slug: string; data: CollectionDynamicPageQueryQuery }

export const useSearchParams = (props: Props): SearchState => {
  const {
    location: { href, pathname },
    serverData,
  } = props

  const selectedFacets = serverData?.collection?.meta.selectedFacets

  return useMemo(() => {
    const maybeState = href ? parseSearchState(new URL(href)) : null

    return {
      page: maybeState?.page ?? 0,
      base: maybeState?.base ?? pathname,
      selectedFacets: AdjustFacets(
        maybeState && maybeState.selectedFacets.length > 0
          ? maybeState.selectedFacets
          : selectedFacets ?? []
      ),
      term: maybeState?.term ?? null,
      sort: maybeState?.sort ?? 'score_desc',
    }
  }, [href, pathname, selectedFacets])
}
