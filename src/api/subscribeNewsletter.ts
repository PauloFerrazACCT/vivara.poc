import axios from 'axios'
import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

import storeConfig from '../../store.config'

const subscribeNewsletter = async (
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) => {
  const { account } = storeConfig

  try {
    const { email, isNewsletterOptIn } = req.body
    const { data } = await axios.post(
      `https://${account}.myvtex.com/api/dataentities/CL/documents`,
      {
        email,
        isNewsletterOptIn,
      },
      {
        headers: {
          Accept: 'application/vnd.vtex.ds.v10+json',
          'Content-Type': 'application/json',
          'X-VTEX-API-AppKey': process.env.APPKEY,
          'X-VTEX-API-AppToken': process.env.APPTOKEN,
        },
      }
    )

    res.send(JSON.stringify(data))
  } catch (err) {
    throw new Error(`Um erro ocorreu: ${err.message}`)
  }
}

export default subscribeNewsletter
