const axios = require('axios')

const storeConfig = require('./store.config')

async function getCollections(page) {
  const { account } = storeConfig
  const { data } = await axios.get(
    `https://${account}.vtexcommercestable.com.br/api/catalog_system/pvt/collection/search?page=${page}&pageSize=1000&orderByAsc=true`,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-VTEX-API-AppKey': process.env.APPKEY,
        'X-VTEX-API-AppToken': process.env.APPTOKEN,
      },
    }
  )

  return data
}

exports.dynamicsCollections = async () => {
  const collections = await getCollections(1)
  const { pages } = collections.paging
  const allCollections = []

  for (let i = 1; i <= pages; i++) {
    // eslint-disable-next-line
    const collectionsItems = await getCollections(i)

    allCollections.push(...collectionsItems.items)
  }

  return allCollections
}
