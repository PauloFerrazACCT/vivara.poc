import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

import getMasterdataURL from '../../services/masterdata'

export default async function getJewelStone(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const { jewelStoneName } = req.body

  if (req.method === 'POST') {
    try {
      const masterdataURL = await getMasterdataURL()

      const { data } = await masterdataURL.get(
        `api/dataentities/PE/search?_fields=_all&_where=nomepedra="${encodeURIComponent(
          jewelStoneName
        )}"`
      )

      res.send(JSON.stringify(data))
    } catch (err) {
      throw new Error(`Um erro ocorreu: ${err.message}`)
    }
  }
}
