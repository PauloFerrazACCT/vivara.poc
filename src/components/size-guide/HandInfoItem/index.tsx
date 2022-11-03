/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import ConfirmationModal from 'src/components/modal/ConfirmationModal'
import MeasuresModal from 'src/components/modal/MeasuresModal'
import IconButton from 'src/components/ui/VivaraIconButton'
import { useMeasureContext } from 'src/contexts/measure-context'
import ToolPencilIcon from 'src/images/svg/icon-toolpencil'
import TrashIcon from 'src/images/svg/icon-trash'

import './styles.scss'

interface HandInfoItemProps {
  side: HandSide
  finger: Finger
  phalange: Measures
  phalangeIndex: number
}

function HandInfoItem({
  side,
  finger,
  phalange,
  phalangeIndex,
}: HandInfoItemProps) {
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
      <div className="hand-info-item">
        <p className="hand-info-item__finger">
          Dedo {finger.name}, falange {phalangeIndex + 1}
        </p>
        <p className="hand-info-item__measure">{phalange}</p>
        <IconButton
          icon={<ToolPencilIcon />}
          aria-label="Editar"
          onClick={() => setIsEditModalOpen(true)}
          className="hand-info-item__action"
        />

        <IconButton
          icon={<TrashIcon />}
          aria-label="Excluir"
          onClick={() => setIsDeleteMeasureModalOpen(true)}
          className="hand-info-item__action"
        />
      </div>
      {isDeleteMeasureModalOpen ? (
        <ConfirmationModal
          headerText="Tem certeza que deseja excluir a medida da falange?"
          bodyText="Você pode editar a medida caso queira apenas alterá-la."
          confirmText="excluir"
          denyText="Manter medidas"
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

export default HandInfoItem
