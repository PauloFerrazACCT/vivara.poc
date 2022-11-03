import React, { useEffect } from 'react'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import { graphql } from 'gatsby'

interface Props {
  serverData: string[]
}

function Page({ serverData }: Props) {
  useEffect(() => {
    const slug = serverData
    const toPath = `/${slug[0]}-${slug[1].toLowerCase()}/p`

    window.location.href = toPath
  }, [])

  return (
    <>
      <GatsbySeo noindex nofollow />

      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        Carregando...
      </div>
    </>
  )
}

export const query = graphql`
  query ProdutoPageQuery {
    cmsGlobalComponents {
      sections {
        name
        data
      }
    }
  }
`

export async function getServerData({
  params: { slug },
}: {
  params: Record<string, string>
}) {
  const slugSplit = slug?.split('/')
  const ONE_YEAR_CACHE = `s-maxage=31536000, stale-while-revalidate`

  return {
    status: 200,
    props: slugSplit ?? {},
    headers: {
      'cache-control': ONE_YEAR_CACHE,
    },
  }
}

export default Page
