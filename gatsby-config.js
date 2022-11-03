const { join, resolve } = require('path')

const dotenv = require('dotenv')
const { createProxyMiddleware } = require('http-proxy-middleware')

const config = require('./store.config')

dotenv.config({ path: 'vtex.env' })
dotenv.config({ path: 'dev.env' })

module.exports = {
  jsxRuntime: 'automatic',
  siteMetadata: {
    title: 'Vivara',
    description: 'Tornando toda história única e especial.',
    titleTemplate: '%s | Tornando toda história única e especial.',
    author: 'Store Framework',
    siteUrl: config.storeUrl,
  },
  flags: {
    FAST_DEV: true,
    PARALLEL_SOURCING: true,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-anchor-links`,
    'draftjs-to-html',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        query: `
          {
            allSitePage {
              nodes {
                path
              }
            }
          }
        `,
        output: '/sitemap',
        resolveSiteUrl: () => config.storeUrl,
        resolvePages: ({ allSitePage: { nodes: allPages } }) => {
          return allPages.map((page) => {
            return { ...page }
          })
        },
        serialize: ({ path }) => {
          return {
            url: path,
            lastmod: Date.now(),
          }
        },
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        resolveEnv: () => process.env.NODE_ENV || 'development',
        env: {
          production: {
            policy: [
              {
                userAgent: '*',
                allow: '/',
                disallow: [
                  '/img/*',
                  '/account/*',
                  '/checkout/*',
                  '/busca/*',
                  '/quick-view/*',
                  '/espiar/*',
                  '/buscapagina/*',
                ],
              },
            ],
          },
          development: {
            policy: [{ userAgent: '*', disallow: ['/'] }],
          },
        },
      },
    },
    {
      resolve: 'gatsby-plugin-next-seo',
      options: {
        defer: true,
      },
    },
    {
      resolve: 'gatsby-plugin-image',
    },
    {
      resolve: '@vtex/gatsby-plugin-thumbor',
      options: {
        server: 'https://assets.vtex.app',
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#FFA687',
        showSpinner: false,
      },
    },
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        src: resolve('./src'),
        '@generated': resolve('./@generated'),
      },
    },
    {
      resolve: 'gatsby-plugin-bundle-stats',
      options: {
        compare: true,
        baseline: true,
        html: true,
        json: true,
        outDir: `.`,
        stats: {
          context: join(__dirname, 'src'),
        },
      },
    },
    {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: 'bundle-analyser.html',
      },
    },
    {
      resolve: 'gatsby-plugin-gatsby-cloud',
    },
    {
      resolve: 'gatsby-plugin-postcss',
    },
    {
      resolve: '@vtex/gatsby-source-cms',
      options: {
        workspace: 'master',
        tenant: config.account,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Vivara | Tornando toda história única e especial.',
        short_name: 'Vivara',
        start_url: '/',
        icon: 'src/images/favicon.png',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: join(__dirname, 'src/images'),
      },
    },
    {
      resolve: '@sentry/gatsby',
    },
  ],
  developMiddleware: (app) => {
    app.use(
      '/api/checkout',
      createProxyMiddleware({
        target: `https://${config.account}.vtexcommercestable.com.br`,
        changeOrigin: true,
        logLevel: 'debug',
      })
    )
  },
}
