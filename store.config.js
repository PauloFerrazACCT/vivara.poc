const ACCOUNT = 'lojavivara'

module.exports = {
  account: ACCOUNT,

  // E-commerce Platform
  platform: 'vtex',

  // Platform specific configs for APIs
  api: {
    storeId: ACCOUNT,
    environment: 'vtexcommercestable',
    hideUnavailableItems: true,
  },

  // Default channel
  channel: '{"salesChannel":"1","regionId":""}',
  currency: {
    code: 'BRL',
    symbol: 'R$',
  },
  country: 'BRA',
  locale: 'pt-br',

  session: {
    currency: {
      code: 'BRL',
      symbol: 'R$',
    },
    locale: 'pt-br',
    channel: '{"salesChannel":"1","regionId":""}',
    country: 'BRL',
    postalCode: null,
    person: null,
  },

  // Production URLs
  storeUrl: `https://www.vivara.com.br`,
  secureSubdomain: `https://secure.vivara.com.br`,
  checkoutUrl: `https://secure.vivara.com.br/checkout`,
  loginUrl: `https://secure.vivara.com.br/login`,
  accountUrl: `https://secure.vivara.com.br/account`,

  // Lighthouse CI
  lighthouse: {
    server: process.env.BASE_SITE_URL || 'http://localhost:9000',
    pages: {
      home: '/',
      pdp: '/anel-prata-an00052758/p',
      collection: '/categoria/joias',
    },
  },

  // E2E CI
  cypress: {
    pages: {
      home: '/',
      pdp: '/anel-prata-an00052758/p',
      collection: '/categoria/joias',
      collection_filtered: '/categoria/joias/?sort=score_desc&page=0',
      search: '/s?q=anel',
    },
  },
}
