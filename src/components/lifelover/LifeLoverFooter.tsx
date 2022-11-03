import React from 'react'
import { Link } from 'gatsby'
import type { UserLifeLover } from 'src/pages/life-lovers'

import { questions } from '../../mocks/faq'

type UserLifeLoverProps = {
  user: UserLifeLover
}

const LifeLoverFooter = ({ user }: UserLifeLoverProps) => {
  return (
    <>
      {user === 'NOTLOGGED' && (
        <section className="grid-content faq">
          <div className="faq__col">
            <div className="faq__tabs">
              {questions?.map((ans, index) => {
                const { question, answer } = ans

                return (
                  <div className="faq__tab" key={index}>
                    <input type="radio" id={`answer${index}`} name="answer" />
                    <label
                      className="faq__tab-label"
                      htmlFor={`answer${index}`}
                    >
                      {question}
                    </label>
                    <div className="faq__tab-content">{answer}</div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="faq__btn-content">
            <Link to="/#" className="faq__btn--dark">
              QUERO SER UM LIFE LOVER
            </Link>
            <Link to="/#" className="faq__btn">
              JÁ SOU LIFE LOVER
            </Link>
          </div>
        </section>
      )}

      <section className="grid-content contact">
        <Link
          to="https://www.vivara.com.br/regras/lifelovers"
          className="contact__btn"
        >
          REGULAMENTO
        </Link>
        <Link
          to="https://www.vivara.com.br/fale-conosco"
          className="contact__btn"
        >
          CONTATO
        </Link>
      </section>
    </>
  )
}

export default LifeLoverFooter
