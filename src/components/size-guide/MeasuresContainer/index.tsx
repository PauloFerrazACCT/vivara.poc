import { useSession } from 'src/sdk/session'
import React, { useEffect } from 'react'

import { useMeasureContext } from '../../../contexts/measure-context'
import MyAccountBody from '../../common/MyAccountBody'
import HandInfoContainer from '../HandInfoContainer'
import HandsContainer from '../HandsContainer'

import './styles.scss'

function MeasuresContainer() {
  const { getMeasures } = useMeasureContext()
  const { person } = useSession()

  useEffect(() => {
    getMeasures()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [person])

  return (
    <MyAccountBody
      title="Minhas Medidas"
      iconType="close"
      onIconClickAnchor="/"
    >
      <div className="size-guide-hands-container">
        <HandsContainer side="left" />
        <HandsContainer side="right" />
      </div>
      <div className="size-guide-hand-info-container">
        <h1>Minhas medidas cadastradas</h1>
        <HandInfoContainer side="left" />
        <HandInfoContainer side="right" />
      </div>
    </MyAccountBody>
  )
}

export default MeasuresContainer
