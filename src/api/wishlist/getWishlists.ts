import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

import getMasterdataURL from '../../services/masterdata'

export default async function getWishlist(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  try {
    const masterdataURL = await getMasterdataURL()

    if (!masterdataURL || !req.query.userId) {
      return
    }

    const { data } = await masterdataURL.get(
      '/api/dataentities/wishlist/search?_schema=wishlist-schema',
      {
        params: {
          _fields: 'id,name,productList,isDefault',
          _where: `userId = "${req.query.userId}"`,
          _sort: 'createdIn ASC',
        },
        headers: {
          'cache-control': 'no-cache, no-store',
        },
      }
    )

    res.setHeader('cache-control', 'no-cache, no-store')
    res.send(JSON.stringify(data))
  } catch (err) {
    throw new Error(`Um erro ocorreu: ${err.message}`)
  }
}
