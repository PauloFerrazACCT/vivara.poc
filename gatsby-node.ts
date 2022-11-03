import md5 from 'md5'
import util from 'util'
import fs from 'fs'
import glob from 'glob'

import redirects from './redirects.json'

const path = require('path')

const { copyLibFiles } = require('@builder.io/partytown/utils')

const { apiSchema } = require('./src/server')
const { dynamicsCollections } = require('./dynamicsCollections')

exports.onPreInit = async ({ reporter }) => {
  reporter.info('Copying Partytown Files')

  await copyLibFiles(path.resolve('./public/~partytown'))
}

exports.onCreateWebpackConfig = ({ actions: { setWebpackConfig }, stage }) => {
  const profiling = process.env.GATSBY_STORE_PROFILING === 'true'

  if (stage === 'build-javascript') {
    if (profiling) {
      setWebpackConfig({
        optimization: {
          minimize: false,
          moduleIds: 'named',
          chunkIds: 'named',
          concatenateModules: false,
        },
      })
    } else {
      setWebpackConfig({
        optimization: {
          runtimeChunk: {
            name: `webpack-runtime`,
          },
          splitChunks: {
            name: false,
            cacheGroups: {
              styles: {
                name: `styles`,
                test: /\.(css|scss)$/,
                chunks: `initial`,
                enforce: true,
              },
            },
          },
        },
      })
    }
  }
}

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: `@faststore/graphql-utils/babel`,
    options: {},
  })
}

exports.createSchemaCustomization = async (gatsbyApi) => {
  const { actions } = gatsbyApi
  const typeDefs = `
    type CmsInstitutionalPageConfigSlugAndFilterConfig implements Node {
      sort: String
    }
  `

  actions.createTypes(typeDefs)
  actions.addThirdPartySchema({ schema: await apiSchema })
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  redirects().then((res) => {
    res?.forEach((redirect: Redirect) => {
      const { fromPath, toPath, statusCode } = redirect

      if (fromPath || toPath || statusCode) {
        createRedirect({
          fromPath,
          toPath,
          ignoreCase: false,
          isPermanent: true,
          redirectInBrowser: false,
          force: false,
          statusCode,
        })
      }
    })
  })

  // Collection Dynamic Pages
  const collectionTemplete = path.resolve('src/pages/colecao.tsx')
  const allDynamicsCollections = await dynamicsCollections()

  allDynamicsCollections.forEach((collection) => {
    const slug = encodeURIComponent(
      collection.name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/ /g, '-')
    ).toLowerCase()

    createPage({
      path: `colecao/${slug}`,
      component: collectionTemplete,
    })
  })

  // LP pages
  const lpTemplate = path.resolve(`src/pages/lp.tsx`)
  const result = await graphql(`
    query {
      allCmsInstitutionalPage {
        edges {
          node {
            name
            sections {
              data
              name
            }
            config {
              slugAndFilterConfig {
                slug
                filterGroup {
                  allItems {
                    key
                    value
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  result.data.allCmsInstitutionalPage.edges.forEach((edge) => {
    if (edge.node.config === null) {
      return
    }

    createPage({
      path: `${edge.node.config.slugAndFilterConfig.slug}`,
      component: lpTemplate,
    })
  })
}

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions
  const allDynamicsCollections = await dynamicsCollections()

  for (const collection of allDynamicsCollections) {
    const node = {
      id: createNodeId(`${collection.id}`),
      parent: null,
      internal: {
        type: `dynamicCollections`,
      },
      slug: encodeURIComponent(
        collection.name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/ /g, '-')
      ).toLowerCase(),
      title: collection.name,
      idCollection: collection.id,
    }

    const contentDigest = createContentDigest(collection)

    node.internal.contentDigest = contentDigest
    createNode(node)
  }
}

const hash = md5(`${new Date().getTime()}`)

const addPageDataVersion = async (file) => {
  const stats = await util.promisify(fs.stat)(file)
  if (stats.isFile()) {
    let content = await util.promisify(fs.readFile)(file, 'utf8')
    const result = content.replace(
      /page-data.json(\?v=[a-f0-9]{32})?/g,
      `page-data.json?v=${hash}`
    )
    await util.promisify(fs.writeFile)(file, result, 'utf8')
  }
}

exports.onPostBootstrap = async () => {
  const loader = path.join(__dirname, 'node_modules/gatsby/cache-dir/loader.js')
  await addPageDataVersion(loader)
}

exports.onPostBuild = async () => {
  const publicPath = path.join(__dirname, 'public')
  const htmlAndJSFiles = glob.sync(`${publicPath}/**/*.{html,js}`)
  for (let file of htmlAndJSFiles) {
    await addPageDataVersion(file)
  }
}

type Redirect = {
  fromPath: string
  toPath: string
  statusCode: number
}
