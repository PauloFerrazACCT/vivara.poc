import { graphql } from 'gatsby'
import React from 'react'
import SatisfactionSurvey from 'src/components/sections/SatisfactionSurvey'

function Page() {
  return (
    <>
      <SatisfactionSurvey />
    </>
  )
}

export const query = graphql`
  query SatisfactionSurvey {
    cmsGlobalComponents {
      sections {
        name
        data
      }
    }
  }
`

export default Page
