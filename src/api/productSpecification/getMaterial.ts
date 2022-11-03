import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

import getMasterdataURL from '../../services/masterdata'

export default async function getMaterial(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const { materialName } = req.body

  if (req.method === 'POST') {
    try {
      const masterdataURL = await getMasterdataURL()

      const { data } = await masterdataURL.get(
        `api/dataentities/MA/search?_fields=_all&_where=nomematerial="${encodeURIComponent(
          materialName
        )}"`
      )

      res.send(JSON.stringify(data))
    } catch (err) {
      throw new Error(`Um erro ocorreu: ${err.message}`)
    }
  }
}
