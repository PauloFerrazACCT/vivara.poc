import React, { useState } from 'react'
import IconButton from 'src/components/ui/VivaraIconButton'
import ConfirmationModal from 'src/components/modal/ConfirmationModal'
import { useMeasureContext } from 'src/contexts/measure-context'
import TrashIcon from 'src/images/svg/icon-trash'
import ThumbImg from 'src/images/svg/finger-1'
import IndicatorImg from 'src/images/svg/finger-2'
import MiddleImg from 'src/images/svg/finger-3'
import RingImg from 'src/images/svg/finger-4'
import PinkyImg from 'src/images/svg/finger-5'

import FingerCardItem from '../FingerCardItem'

import './styles.scss'

interface FingerCardProps {
  finger: Finger
  side: HandSide
}

const FINGER_IMAGES = {
  0: <ThumbImg />,
  1: <IndicatorImg />,
  2: <MiddleImg />,
  3: <RingImg />,
  4: <PinkyImg />,
}

function FingerCard({ finger, side }: FingerCardProps) {
  const { deleteAllFingerMeasures } = useMeasureContext()
  const [isDeleteFingerModalOpen, setIsDeleteFingerModalOpen] = useState(false)

  const onConfirmAction = () => {
    deleteAllFingerMeasures(side, finger.id)
  }

  return (
    <>
      <div className="finger-card__container">
        <div className={`finger-card__img-container-${side}`}>
          {FINGER_IMAGES[finger.id]}
          <IconButton
            icon={<TrashIcon />}
            aria-label="Excluir"
            onClick={() => {
              setIsDeleteFingerModalOpen(true)
            }}
            className="finger-card__delete-btn"
          />
        </div>
        <h3 className="finger-card__title">{finger.name}</h3>
        <div className="finger-card__phalange-list">
          {finger.measures?.map((phalange, phalangeIndex: number) => (
            <FingerCardItem
              key={phalangeIndex}
              side={side}
              finger={finger}
              phalange={phalange}
              phalangeIndex={phalangeIndex}
            />
          ))}
        </div>
      </div>
      {isDeleteFingerModalOpen ? (
        <ConfirmationModal
          headerText="Tem certeza que deseja excluir as medidas do dedo?"
          bodyText="Se você quiser alterar a medida de apenas uma das falanges é só clicar no número e editar."
          denyText="Manter medidas"
          confirmText="excluir"
          isOpen={isDeleteFingerModalOpen}
          setIsOpen={setIsDeleteFingerModalOpen}
          onConfirmAction={onConfirmAction}
        />
      ) : (
        <></>
      )}
    </>
  )
}

export default FingerCard
