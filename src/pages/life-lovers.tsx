/* eslint-disable no-console */
import type { Dispatch, SetStateAction } from 'react'
import React, { useEffect, useState } from 'react'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import axios from 'axios'
import { useUserContext } from 'src/contexts/user-context'
import { graphql } from 'gatsby'
import loadable from '@loadable/component'

import Spinner from '../components/common/Spinner'
import { LifeLoverContent } from '../components/lifelover'

import './life-lover.scss'

const LifeLoverFooter = loadable(
  () => import('../components/lifelover/LifeLoverFooter')
)

export type LifeLoverData = Array<{
  lifelover?: boolean
  email: string
  firstName?: string
  lastName?: string
}>

type GetLifeLoverData = {
  url: string
  body: Record<string, unknown>
  setLifeLoverData: Dispatch<SetStateAction<LifeLoverData | undefined>>
}

const getLifeLoverData = async ({
  url,
  body,
  setLifeLoverData,
}: GetLifeLoverData) => {
  await axios
    .post(url, body, {
      headers: {
        Accept: 'application/vnd.vtex.ds.v10+json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
    .then((response) => {
      setLifeLoverData(response.data)
    })
    .catch((error) => {
      console.error(error)
    })
}

export type UserLifeLover =
  | 'NOTLOGGED'
  | 'LOGGEDNOTLIFELOVER'
  | 'LOGGEDISLIFELOVER'

function Page() {
  useEffect(() => {
    window.addEventListener('message', (message) => {
      if (message.data.name !== 'PageViewEvent') {
        return
      }

      window.postMessage({
        name: 'AnalyticsEvent',
        params: {
          name: 'store:page_view',
          params: { ...message.data.params.params, pageType: 'Home' },
        },
      })
    })
  }, [])
  const { user: person } = useUserContext()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<UserLifeLover>('NOTLOGGED')
  const [lifeLoverData, setLifeLoverData] = useState<
    LifeLoverData | undefined
  >()

  useEffect(() => {
    if (person?.email) {
      setLoading(true)
      getLifeLoverData({
        url: '/api/getLifeLover',
        body: { email: person?.email },
        setLifeLoverData,
      }).then(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [person])

  useEffect(() => {
    if (lifeLoverData) {
      if (lifeLoverData[0].lifelover) {
        setUser('LOGGEDISLIFELOVER')
      } else {
        setUser('LOGGEDNOTLIFELOVER')
      }
    } else {
      setUser('NOTLOGGED')
    }
  }, [lifeLoverData])

  if (loading) {
    return (
      <section className="page__section">
        <div className="life-lover">
          <div className="grid-content">
            <h1 className="loading">
              <Spinner />
            </h1>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <GatsbySeo
        title="Life Lover"
        description="Life Lover Page"
        language="pt-BR"
        noindex
        nofollow
      />
      <section className="page__section">
        <div className="life-lover">
          <LifeLoverContent user={user} lifeLoverData={lifeLoverData} />
          <LifeLoverFooter user={user} />
        </div>
      </section>
    </>
  )
}

export const query = graphql`
  query LifeLoverPageQuery {
    cmsGlobalComponents {
      sections {
        name
        data
      }
    }
  }
`

export default Page
