import { account } from './store.config'
import axios from 'axios'

const redirectsObject: Redirect[] = [
  // Sitemap Redirects.
  {
    fromPath: '/sitemap.xml',
    toPath: `https://${account}.vtexcommercestable.com.br/api/io/_v/sitemap-proxy/sitemap.xml`,
    statusCode: 200,
  },
  {
    fromPath: '/sitemap/subcategory-0.xml',
    toPath: `https://${account}.vtexcommercestable.com.br/api/io/_v/sitemap-proxy/sitemap/subcategory-0.xml`,
    statusCode: 200,
  },
  {
    fromPath: '/sitemap/department-0.xml',
    toPath: `https://${account}.vtexcommercestable.com.br/api/io/_v/sitemap-proxy/sitemap/department-0.xml`,
    statusCode: 200,
  },
  {
    fromPath: '/sitemap/brand-0.xml',
    toPath: `https://${account}.vtexcommercestable.com.br/api/io/_v/sitemap-proxy/sitemap/brand-0.xml`,
    statusCode: 200,
  },
  {
    fromPath: '/sitemap/category-0.xml',
    toPath: `https://${account}.vtexcommercestable.com.br/api/io/_v/sitemap-proxy/sitemap/category-0.xml`,
    statusCode: 200,
  },
  {
    fromPath: '/sitemap/product-0.xml',
    toPath: `https://${account}.vtexcommercestable.com.br/api/io/_v/sitemap-proxy/sitemap/product-0.xml`,
    statusCode: 200,
  },
  {
    fromPath: '/sitemap/product-1.xml',
    toPath: `https://${account}.vtexcommercestable.com.br/api/io/_v/sitemap-proxy/sitemap/product-1.xml`,
    statusCode: 200,
  },
  {
    fromPath: '/sitemap/product-2.xml',
    toPath: `https://${account}.vtexcommercestable.com.br/api/io/_v/sitemap-proxy/sitemap/product-2.xml`,
    statusCode: 200,
  },
  {
    fromPath: '/sitemap/product-3.xml',
    toPath: `https://${account}.vtexcommercestable.com.br/api/io/_v/sitemap-proxy/sitemap/product-3.xml`,
    statusCode: 200,
  },
  {
    fromPath: '/sitemap/product-4.xml',
    toPath: `https://${account}.vtexcommercestable.com.br/api/io/_v/sitemap-proxy/sitemap/product-4.xml`,
    statusCode: 200,
  },
  // Sitemap redirects -- END
]

export default async function getUrl() {
  try {
    const { data } = await axios.get(
      `https://${account}.vtexcommercestable.com.br/api/dataentities/AR/search?_fields=fromPath,toPath,statusCode`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          'rest-range': 'resources=0-999',
          'X-VTEX-API-AppKey': process.env.APPKEY,
          'X-VTEX-API-AppToken': process.env.APPTOKEN,
        },
      }
    )

    return [...redirectsObject, ...data]
  } catch (err) {
    console.error('Error in the masterdata request => ', err)
  }
}

type Redirect = {
  fromPath: string
  toPath: string
  statusCode: number
}
