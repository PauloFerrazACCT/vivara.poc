import React, { useState, useEffect } from 'react'
import axios from 'axios'

interface VivaraCollectionProps {
  collection: Specification[]
  setHasCollection: (hasCollection: boolean) => void
}

interface Specification {
  name?: string
  propertyID?: string
  value?: string
  valueReference?: string
}

//  The requisition data comes in Portuguese
interface CollectionItemDetails {
  colecao?: string
  descricaocolecao?: string
}

const VivaraCollection = ({
  collection,
  setHasCollection,
}: VivaraCollectionProps) => {
  const [collectionDetails, setCollectionDetails] = useState([])
  const collectionValue = collection?.[0]?.value

  const getCollection = React.useCallback(async () => {
    await axios
      .post(
        '/api/productSpecification/getProductColection',
        { colectionName: collectionValue },
        {
          headers: {
            Accept: 'application/vnd.vtex.ds.v10+json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
      .then((response) => {
        if (response.data.length > 0) {
          setCollectionDetails(response.data)
          setHasCollection(true)
        } else {
          setCollectionDetails([])
          setHasCollection(false)
        }
      })
      .catch((error) => {
        setHasCollection(false)
        console.error(error)
      })
  }, [collectionValue, setHasCollection])

  useEffect(() => {
    getCollection()
  }, [collectionValue, getCollection])

  return (
    <div className="vivaraCollection-container">
      {collectionDetails?.map(
        (
          {
            colecao: collectionName,
            descricaocolecao: description,
          }: CollectionItemDetails,
          index: number
        ) => (
          <div key={`${index}-colletion`}>
            <div className="vivaraCollection-title">{collectionName}</div>
            <div className="vivaraCollection-content">
              <p className="vivaraCollection-content__text">{description}</p>
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default VivaraCollection
