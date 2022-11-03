import React from 'react'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import { graphql } from 'gatsby'
import SizeGuidePage from 'src/views/sizeguide'

function Page() {
  return (
    <>
      <GatsbySeo
        title="Size Guide"
        description="Size Guide Component"
        language="pt-BR"
        noindex
        nofollow
      />
      <SizeGuidePage />
    </>
  )
}

export const query = graphql`
  query SizeGuidePageQuery {
    cmsGlobalComponents {
      sections {
        name
        data
      }
    }
  }
`

export default Page
