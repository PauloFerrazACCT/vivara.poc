import React from 'react'

import { BellImg, GiftImg, TagImg } from '../../images/life-lover'

const LifeLoverBenefits = () => {
  return (
    <>
      <div className="benefits__bg">
        <div className="grid-content">
          <section className="benefits">
            <h2 className="benefits__title">Experimente benefícios únicos</h2>
            <p className="benefits__subtitle">
              Conheça nossas vantangens de ser <strong>Life Lover</strong>
            </p>
            <div className="benefits__content">
              <div className="benefits__item">
                <GiftImg />
                <p>Surpresa especial no seu aniversário</p>
              </div>
              <div className="benefits__item">
                <TagImg />
                <p>Benefícios exclusivos de compra</p>
              </div>
              <div className="benefits__item">
                <BellImg />
                <p>Fique sabendo das novidades primeiro</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default LifeLoverBenefits
