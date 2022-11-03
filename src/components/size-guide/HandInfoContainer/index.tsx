/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useMeasureContext } from 'src/contexts/measure-context'
import PlusFullIcon from 'src/images/svg/icon-plus-full'

import HandInfoItem from '../HandInfoItem'

import './styles.scss'

interface HandInfoProps {
  side: HandSide
}

function HandInfo({ side }: HandInfoProps) {
  const { measures } = useMeasureContext()

  const [isHandEmpty, setIsHandEmpty] = useState(true)
  const handText = `Mão ${side === 'right' ? 'Direita' : 'Esquerda'}`

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    checkIfEveryHandMeasureIsNull()
  }, [measures])

  const checkIfEveryHandMeasureIsNull = () => {
    const flatMeasures = measures?.[side]
      ?.map((finger) => finger.measures)
      .flat()

    const isEveryMeasureNull = flatMeasures?.every(
      (measure) => measure === null
    )

    setIsHandEmpty(isEveryMeasureNull)
  }

  return (
    <>
      <div className="hand-info__container">
        <h2>{handText}</h2>
        {measures?.[side] && !isHandEmpty ? (
          <div className="hand-info__list">
            {measures[side]?.map((finger) =>
              finger.measures?.map((phalange, phalangeIndex: number) =>
                phalange ? (
                  <HandInfoItem
                    key={phalangeIndex}
                    side={side}
                    finger={finger}
                    phalange={phalange}
                    phalangeIndex={phalangeIndex}
                  />
                ) : null
              )
            )}
          </div>
        ) : (
          <div className="hand-info__not-found">
            Você ainda não adicionou nenhuma medida para esta mão, para incluir
            basta clicar no ícone <PlusFullIcon /> acima
          </div>
        )}
      </div>
    </>
  )
}

export default HandInfo
