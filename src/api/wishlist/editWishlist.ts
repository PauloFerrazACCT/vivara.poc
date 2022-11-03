import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

import getMasterdataURL from '../../services/masterdata'

export default async function editWishlist(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  try {
    const masterdataURL = await getMasterdataURL()

    if (!masterdataURL) {
      return
    }

    const {
      wishlist: { userId, id, name, productList, isDefault },
    } = req.body

    const { data } = await masterdataURL.patch(
      `api/dataentities/wishlist/documents/${id}?_schema=wishlist-schema`,
      JSON.stringify({
        userId,
        name,
        productList,
        isDefault,
      })
    )

    res.setHeader('cache-control', 'no-cache, no-store')
    res.send(JSON.stringify(data))
  } catch (err) {
    throw new Error(`Um erro ocorreu: ${err.message}`)
  }
}
