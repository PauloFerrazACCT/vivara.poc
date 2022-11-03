import React from 'react'
import { Link } from 'gatsby'
import PlusFullIcon from 'src/images/svg/icon-plus-full'
import RightHand from 'src/images/righthand.png'
import LeftHand from 'src/images/lefthand.png'

import './styles.scss'

interface HandInfoProps {
  side: HandSide
}

function HandInfo({ side }: HandInfoProps) {
  const handText = `Mão ${side === 'right' ? 'Direita' : 'Esquerda'}`
  const handTextStyle = `${side === 'right' ? 'right' : 'left'}`

  return (
    <div className="hands-container">
      <h2 className="hands-title">{handText}</h2>
      {side === 'right' ? (
        <img src={RightHand} alt={handText} />
      ) : (
        <img src={LeftHand} alt={handText} />
      )}
      <div className={`hands-btn-${handTextStyle}`}>
        <Link
          state={{ side }}
          to="/size-guide/measures"
          aria-label="Ir para página de falanges"
        >
          <PlusFullIcon />
        </Link>
      </div>
    </div>
  )
}

export default HandInfo
