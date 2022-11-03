import type { FC } from 'react'
import React from 'react'

import './WhatsApp.scss'

const style1 = {
  marginRight: '10px',
  color: '#F08769',
  fontFize: '35px',
  marginLeft: '-7px',
}

const style2 = {
  background: '#FFA687',
  color: '#fff',
}

const style3 = {
  color: '#fff',
  marginRight: '20px',
}

const style4 = {
  marginBottom: '28px',
}

const style5 = {
  fontSize: '22px',
  marginRight: '10px',
  color: '#fff',
}

const Open = () => {
  const chatBot = document.querySelector('.open-chatbot-container')

  chatBot?.classList?.add('active')
}

const Close = () => {
  const chatBot = document.querySelector('.open-chatbot-container')

  chatBot?.classList?.remove('active')
}

const WhatsApp: FC<Props> = () => {
  return (
    <div className="chatbot-container">
      <div className="activate-chatbot">
        <button onClick={Open}>
          <img
            src="https://images.vivara.com.br/Stores/Site3/icones/whtpp_icon_button.svg?im-q=high"
            className="activate-chatbot-btn"
            alt="WhatsApp"
          />
        </button>
      </div>

      <div className="open-chatbot-container">
        <p className="open-chatbot-title">
          <i className="icon icon-icone-whatsapp-2" style={style1} />
          Precisa de ajuda?
        </p>

        <div className="chatbot-itens-wrapper">
          <a href="https://whts.co/vivara" target="_blank" rel="noreferrer">
            <button style={style2}>
              <i className="icon icon-ic_gift" style={style3} />
              Personal Shopper
            </button>
          </a>
          <p style={style4}>Compre com uma vendedora</p>
          <a
            href="https://api.whatsapp.com/send/?phone=5511987770045&text&app_absent=0"
            target="_blank"
            rel="noreferrer"
          >
            <button style={style2}>
              <i
                className="icon icon-ic_message"
                style={style5}
                aria-hidden="true"
              />
              DÚVIDAS OU SUPORTE
            </button>
          </a>
          <p style={style4}>Como consultar status de pedido entre outras</p>
          <div className="activate-chatbot force-position">
            <button className="activate-chatbot-btn-2" onClick={Close}>
              X
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhatsApp
