import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

import getMasterdataURL from '../../services/masterdata'

export default async function addWishlist(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  if (req.method === 'POST') {
    try {
      const masterdataURL = await getMasterdataURL()

      if (!masterdataURL) {
        return
      }

      const { wishlist } = req.body

      const { data } = await masterdataURL.post(
        `api/dataentities/wishlist/documents?_schema=wishlist-schema`,
        wishlist
      )

      res.setHeader('cache-control', 'no-cache, no-store')
      res.send(JSON.stringify(data))
    } catch (err) {
      throw new Error(`Um erro ocorreu: ${err.message}`)
    }
  }
}
