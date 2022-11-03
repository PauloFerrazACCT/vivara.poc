import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

import getMasterdataURL from '../../services/masterdata'

export default async function deleteWishlist(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  try {
    const masterdataURL = await getMasterdataURL()

    if (!masterdataURL) {
      return
    }

    const { id } = req.body

    await masterdataURL.delete(`api/dataentities/wishlist/documents/${id}`)

    res.setHeader('cache-control', 'no-cache, no-store')
    res.status(204)
    res.send(null)
  } catch (err) {
    throw new Error(`Um erro ocorreu: ${err.message}`)
  }
}
