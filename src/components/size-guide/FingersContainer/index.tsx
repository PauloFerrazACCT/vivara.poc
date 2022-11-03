import React, { useRef } from 'react'
import Slider from 'react-slick'
import { useMeasureContext } from 'src/contexts/measure-context'
import IconButton from 'src/components/ui/VivaraIconButton'
import ArrowLeftIcon from 'src/images/svg/icon-arrow-left'
import ArrowRightIcon from 'src/images/svg/icon-arrow-right'

import FingerCard from '../FingerCard'
import sliderSettings from '../../../configs/slider-my-measures'
import MyAccountBody from '../../common/MyAccountBody'

import './styles.scss'

interface FingersContainerProps {
  side: HandSide
}

function FingersContainer({ side }: FingersContainerProps) {
  const { measures } = useMeasureContext()

  const handText = `Mão ${side === 'right' ? 'Direita' : 'Esquerda'}`
  const sliderRef = useRef<any>(null)

  return (
    <MyAccountBody
      title={handText}
      iconType="return"
      onIconClickAnchor="/size-guide"
    >
      <div className="fingers-container__header">
        <h2 className="fingers-container__title">Escolha um dedo</h2>
        <div className="fingers-container__arrows">
          <IconButton
            icon={<ArrowLeftIcon />}
            aria-label="Mover para esquerda"
            onClick={() => sliderRef.current.slickPrev()}
          />
          <IconButton
            icon={<ArrowRightIcon />}
            aria-label="Mover para direita"
            onClick={() => sliderRef.current.slickNext()}
          />
        </div>
      </div>
      <Slider ref={sliderRef} {...sliderSettings}>
        {measures?.[side]?.map((finger) => (
          <FingerCard key={finger.id} finger={finger} side={side} />
        ))}
      </Slider>
    </MyAccountBody>
  )
}

export default FingersContainer
