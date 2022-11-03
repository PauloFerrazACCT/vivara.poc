import React, { useMemo } from 'react'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import type { PageProps } from 'gatsby'
import { graphql } from 'gatsby'

type Props = PageProps

const useErrorState = (location: Location) =>
  useMemo(() => {
    const params = new URLSearchParams(location.search)
    const errorId = params.get('errorId')
    const fromUrl = params.get('from')

    return {
      errorId,
      fromUrl,
    }
  }, [location.search])

function Page({ location }: Props) {
  const { errorId, fromUrl } = useErrorState(location)

  return (
    <>
      <GatsbySeo
        title="Vivara, Erro 500!"
        description="Error 500 page"
        language="pt-BR"
        noindex
        nofollow
      />

      <h1>500</h1>
      <h2>Internal Server Error</h2>

      <div>
        The server errored with id {errorId} when visiting page {fromUrl}
      </div>
    </>
  )
}

export const query = graphql`
  query ServerErrorPageQuery {
    cmsGlobalComponents {
      sections {
        name
        data
      }
    }
  }
`

export default Page
