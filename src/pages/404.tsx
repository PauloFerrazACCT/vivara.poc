import React, { useEffect } from 'react'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import { graphql } from 'gatsby'

import storeConfig from '../../store.config'

import './404.scss'

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
          params: { ...message.data.params.params, pageType: 'Outros' },
        },
      })
    })
  }, [])
  const { account } = storeConfig

  return (
    <div className="error">
      <GatsbySeo
        title="Vivara, Erro 404!"
        description="Error 400 page"
        language="pt-BR"
        noindex
        nofollow
      />
      <div className="error__img-container">
        <img
          src={`http://${account}.vtexassets.com/arquivos/erro-404.png`}
          alt="Caixa Vazia"
          className="error__img"
        />
      </div>
      <div className="error__title-container">
        <h3 className="error__title">OPS!</h3>
        <span className="error__span-1">
          Não encontramos o que você procurou.
        </span>

        <span className="error__span-2">
          Mas não desista! Temos um catálogo incrível de itens que podem te
          agradar. Que tal dar uma olhada?
        </span>

        <button className="error__btn-home">ir para home</button>
      </div>
    </div>
  )
}

export const query = graphql`
  query NotFoundPageQuery {
    cmsGlobalComponents {
      sections {
        name
        data
      }
    }
  }
`

export default Page
