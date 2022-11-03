import React from 'react'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import { graphql } from 'gatsby'
import MeasuresPage from 'src/views/sizeguide/measuresPage'

function Page({ location }: any) {
  return (
    <>
      <GatsbySeo
        title="Size Guide"
        description="Size Guide Component"
        language="pt-BR"
        noindex
        nofollow
      />
      <MeasuresPage location={location} />
    </>
  )
}

export const query = graphql`
  query MeasuresPageQuery {
    cmsGlobalComponents {
      sections {
        name
        data
      }
    }
  }
`

export default Page
