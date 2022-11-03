import React, { useState } from 'react'
import IconButton from 'src/components/ui/VivaraIconButton'
import ConfirmationModal from 'src/components/modal/ConfirmationModal'
import MeasuresModal from 'src/components/modal/MeasuresModal'
import { useMeasureContext } from 'src/contexts/measure-context'
import PlusFullIcon from 'src/images/svg/icon-plus-full'
import ToolPencilIcon from 'src/images/svg/icon-toolpencil'
import TrashIcon from 'src/images/svg/icon-trash'

import './styles.scss'

interface FingerCardItemProps {
  side: HandSide
  finger: Finger
  phalange: Measures
  phalangeIndex: number
}

function FingerCardItem({
  side,
  finger,
  phalange,
  phalangeIndex,
}: FingerCardItemProps) {
  const { editMeasure } = useMeasureContext()
  const [isDeleteMeasureModalOpen, setIsDeleteMeasureModalOpen] =
    useState(false)

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const onConfirmAction = () => {
    editMeasure(side, finger.id, phalangeIndex)
  }

  const onMeasuresModalClose = (newMeasure: number) => {
    editMeasure(side, finger.id, phalangeIndex, newMeasure)
  }

  return (
    <>
      <div key={phalangeIndex} className="finger-card__phalange-item">
        <p className="finger-card__phalange-title">
          Falange {phalangeIndex + 1}
        </p>
        {phalange ? (
          <>
            <p className="finger-card__phalange-measure">{phalange}</p>
            <IconButton
              icon={<ToolPencilIcon />}
              aria-label="Editar"
              onClick={() => {
                setIsEditModalOpen(true)
              }}
              className="finger-card__action"
            />

            <IconButton
              icon={<TrashIcon />}
              aria-label="Excluir"
              onClick={() => {
                setIsDeleteMeasureModalOpen(true)
              }}
              className="finger-card__action"
            />
          </>
        ) : (
          <p className="finger-card__new-measure">
            Adicionar medida
            <IconButton
              icon={<PlusFullIcon />}
              aria-label="Adicionar"
              onClick={() => {
                setIsEditModalOpen(true)
              }}
            />
          </p>
        )}
      </div>
      {isDeleteMeasureModalOpen ? (
        <ConfirmationModal
          headerText="Tem certeza que deseja excluir a medida da falange?"
          bodyText="Você pode editar a medida caso queira apenas alterá-la."
          denyText="Manter medidas"
          confirmText="excluir"
          isOpen={isDeleteMeasureModalOpen}
          setIsOpen={setIsDeleteMeasureModalOpen}
          onConfirmAction={onConfirmAction}
        />
      ) : (
        <></>
      )}

      {isEditModalOpen ? (
        <MeasuresModal
          isOpen={isEditModalOpen}
          setIsOpen={setIsEditModalOpen}
          currentMeasure={phalange ?? 0}
          onClose={onMeasuresModalClose}
        />
      ) : (
        <></>
      )}
    </>
  )
}

export default FingerCardItem
