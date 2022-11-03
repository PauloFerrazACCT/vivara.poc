import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import axios from 'axios'

import storeConfig from '../../../store.config'

export default async function getAttachment(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const { account } = storeConfig
  const { sku } = JSON.parse(req.body)

  if (req.method === 'POST') {
    try {
      const { data } = await axios.get(
        `https://${account}.vtexcommercestable.com.br/api/catalog/pvt/stockkeepingunit/${sku}/attachment`,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-VTEX-API-AppKey': process.env.APPKEY,
            'X-VTEX-API-AppToken': process.env.APPTOKEN,
          },
        }
      )

      if (!data) {
        res.send(JSON.stringify(data))

        return
      }

      const attachments: any[] = []

      /* eslint-disable no-await-in-loop */
      for (const attachment of data) {
        const attachmentData = await axios.get(
          `https://${account}.vtexcommercestable.com.br/api/catalog/pvt/attachment/${attachment.AttachmentId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'X-VTEX-API-AppKey': process.env.APPKEY,
              'X-VTEX-API-AppToken': process.env.APPTOKEN,
            },
          }
        )

        attachments.push(attachmentData.data)
      }
      /* eslint-enable no-await-in-loop */

      res.send(JSON.stringify(attachments))
    } catch (err) {
      throw new Error(`Um erro ocorreu: ${err.message}`)
    }
  }
}
