import type { Attachment } from '../typings/productData'

interface Props {
  sku: string
}

const useGetAttachment = async ({ sku }: Props): Promise<Attachment> => {
  const params = {
    sku,
  }

  const options = {
    method: 'POST',
    body: JSON.stringify(params),
  }

  return fetch('/api/productCustomization/getAttachment', options).then(
    (response) => {
      return response.json()
    }
  )
}

export default useGetAttachment
