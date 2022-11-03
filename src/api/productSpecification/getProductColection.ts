import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

import getMasterdataURL from '../../services/masterdata'

export default async function getProductColection(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const { colectionName } = req.body

  if (req.method === 'POST') {
    try {
      const masterdataURL = await getMasterdataURL()

      if (!masterdataURL) {
        return
      }

      const { data } = await masterdataURL.get(
        `api/dataentities/IN/search?_fields=_all&_where=colecao="${encodeURIComponent(
          colectionName
        )}"`
      )

      res.send(JSON.stringify(data))
    } catch (err) {
      throw new Error(`Um erro ocorreu: ${err.message}`)
    }
  }
}
