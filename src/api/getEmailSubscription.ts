import axios from 'axios'
import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

import storeConfig from '../../store.config'

const getEmailSubscription = async (
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) => {
  const { account } = storeConfig

  try {
    const { email } = req.body

    const { data } = await axios.get(
      `https://${account}.myvtex.com/api/dataentities/CL/search?email=${email}`,
      {
        headers: {
          'REST-Range': 'resources=0-10',
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

export default getEmailSubscription
