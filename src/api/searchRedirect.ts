import axios from 'axios'
import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

export interface SearchRedirectType {
  data: {
    productSearch: {
      redirect: string | null
    }
  }
}

const searchRedirect = async (
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) => {
  const query = `query ($fullText: String!) {
    productSearch(
          fullText: $fullText
      ) @context(provider: "vtex.search-graphql") {
      redirect
    }
  }`

  try {
    const { fullText }: { fullText: string } = req.body

    const { data }: { data: SearchRedirectType } = await axios.post(
      'https://lojavivara.myvtex.com/_v/private/graphql/v1',
      {
        query,
        variables: {
          fullText,
        },
      },
      {
        headers: {
          Accept: 'application/vnd.vtex.ds.v10+json',
          'Content-Type': 'application/json',
        },
      }
    )

    res.send(JSON.stringify(data))
  } catch (error) {
    throw new Error(`Fail in request: ${error.message}`)
  }
}

export default searchRedirect
