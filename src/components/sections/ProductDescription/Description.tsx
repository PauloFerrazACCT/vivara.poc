import React from 'react'

interface Props {
  description: string
  compositions: any
}

const Description = ({ description, compositions }: Props) => {
  return (
    <>
      <h2 className="description-title">DESCRIÇÃO E COMPOSIÇÃO</h2>
      <p className="description-text">{description}</p>
      <ul className="description-composition">
        {compositions
          ?.filter((element: any) => element?.name.indexOf('Aro') === -1)
          ?.map((composition: any, i: number) => (
            <li
              className="description-composition__item"
              key={`${composition?.name}-${i}`}
            >
              {composition?.name}: {composition?.value}
            </li>
          ))}
      </ul>
    </>
  )
}

export default Description
