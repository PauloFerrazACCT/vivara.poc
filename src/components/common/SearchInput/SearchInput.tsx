import type { SearchEvent } from '@faststore/sdk'
import {
  formatSearchState,
  initSearchState,
  sendAnalyticsEvent,
} from '@faststore/sdk'
import { IconButton, SearchInput as UISearchInput } from '@faststore/ui'
import { navigate } from 'gatsby'
import React from 'react'
import type { SearchInputProps as UISearchInputProps } from '@faststore/ui'
import { MagnifyingGlass as MagnifyingGlassIcon } from 'phosphor-react'
import axios from 'axios'
// eslint-disable-next-line import/order
import type { SearchRedirectType } from 'src/api/searchRedirect'

import './search-input.scss'
import SearchBarCloseIcon from 'src/components/icons/Menu/SearchBarCloseIcon'

declare type SearchInputProps = {
  onSearchClick?: () => void
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>
  buttonTestId?: string
  showSearch: boolean
} & Omit<UISearchInputProps, 'onSubmit'>

const doSearch = async (term: string) => {
  if (typeof window !== 'undefined') {
    const { data }: { data: SearchRedirectType } = await axios.post(
      '/api/searchRedirect',
      {
        fullText: term,
      }
    )

    const redirect = data?.data?.productSearch?.redirect

    if (redirect) {
      window.location.replace(redirect)
    }
  }

  const { pathname, search } = formatSearchState(
    initSearchState({
      term,
      base: '/s',
    })
  )

  sendAnalyticsEvent<SearchEvent>({
    name: 'search',
    params: { search_term: term },
  })

  navigate(`${pathname}${search}`)
}

const SearchInput = ({
  onSearchClick,
  setShowSearch,
  buttonTestId = 'store-search-button',
  showSearch,
  ...props
}: SearchInputProps) => {
  return (
    <>
      <UISearchInput
        // eslint-disable-next-line jsx-a11y/no-autofocus
        onFocus={() => showSearch}
        icon={
          <MagnifyingGlassIcon
            onClick={() => {
              onSearchClick
            }}
            data-testid={buttonTestId}
          />
        }
        placeholder="O que você procura?"
        onSubmit={(term) => {
          doSearch(term)
          setShowSearch(false)
        }}
        {...props}
      />
      <IconButton
        data-store-close-icon-button
        icon={<SearchBarCloseIcon />}
        aria-label="Fechar Busca"
        onClick={() => {
          onSearchClick
          setShowSearch(false)
        }}
      />
    </>
  )
}

export default SearchInput
