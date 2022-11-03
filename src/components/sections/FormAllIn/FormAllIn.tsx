import React, { useState } from 'react'
import { Helmet } from 'react-helmet'

import InputMask from '../../ui/InputMask'
import { ModalAllIn } from './ModalAllIn'
import './FormAllIn.scss'

type Props = {
  title: string
  subtitle: string
  nameList: string
  titleform?: string
  labelbutton: string
  background?: string
  textcolor?: string
  backgroundbutton?: string
}

const FormAllIn = ({
  title,
  subtitle,
  nameList,
  titleform,
  labelbutton,
  background,
  textcolor,
  backgroundbutton,
}: Props) => {
  const [openModal, setOpenModal] = useState(false)

  const srollUp = () => {
    window.scroll({
      top: 0,
    })
  }

  function sendForm(e: any) {
    const categoryCheck = document.querySelectorAll('.category__checkbox')
    const categoryChecked: any[] = []

    e.preventDefault()

    categoryCheck.forEach(function (item) {
      const input = item as HTMLInputElement

      if (input.checked) {
        categoryChecked.push(input.id)
      }
    })

    const productCheck = document.querySelectorAll('.product__checkbox')

    const productChecked: any[] = []

    productCheck.forEach(function (item) {
      const input = item as HTMLInputElement

      if (input.checked) {
        productChecked.push(input.id)
      }
    })

    const policy = document.querySelector('#policy-agree') as HTMLInputElement
    const policyChecked = policy.checked
    const marketing = document.querySelector(
      '#marketing-agree'
    ) as HTMLInputElement

    const marketingChecked = marketing.checked

    function validateBFFieldsForm() {
      const emailREBFForm =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      const nameREBFForm =
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u

      const telREBForm =
        // eslint-disable-next-line no-useless-escape
        /^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/

      const name = document.querySelector('.input-name') as HTMLInputElement
      const dataNasc = document.querySelector(
        '.input-nascimento'
      ) as HTMLInputElement

      const email = document.querySelector('.input-email') as HTMLInputElement
      const tel = document.querySelector('.input-phone') as HTMLInputElement
      const cpf = document.querySelector('.input-cpf') as HTMLInputElement
      const bfResponseBFForm = document.querySelector(
        '#bf-response'
      ) as HTMLTextAreaElement

      if (
        emailREBFForm.test(email.value) &&
        nameREBFForm.test(name.value) &&
        telREBForm.test(tel.value) &&
        dataNasc.value &&
        policyChecked
      ) {
        const currentDate = new Date()
        const day = `00${currentDate.getDate()}`.slice(-2).toString()
        const month = `00${currentDate.getMonth()}`.slice(-2).toString()
        const year = currentDate.getFullYear().toString()
        const stringData = `${year}-${month}-${day}`
        const cat = StringfyArray(categoryChecked)
        const prodType = StringfyArray(productChecked)
        const privacy = '1'
        let optin

        if (marketingChecked) {
          optin = '1'
        } else {
          optin = '0'
        }

        sendBFEmail(
          name.value,
          dataNasc.value,
          email.value,
          tel.value,
          cpf.value,
          stringData,
          cat,
          prodType,
          privacy,
          optin
        )
      } else {
        bfResponseBFForm.innerText = 'Campos Inválidos.'
      }
    }

    validateBFFieldsForm()
    srollUp()

    function StringfyArray(stringTarget: any[]) {
      let aux = ''

      stringTarget.forEach(function (item) {
        aux += `${String(item)}, `
      })
      aux = aux.substring(0, aux.length - 2)

      return aux
    }

    function sendBFEmail(
      name: string,
      dataNasc: string,
      email: string,
      tel: string,
      cpf: string,
      stringData: string,
      cat: string,
      prodType: string,
      privacy: string,
      optin: string
    ) {
      const bfResponseBFForm = document.querySelector(
        '.bf-response'
      ) as HTMLTextAreaElement

      interface WindowPlus extends Window {
        lc: { sendData: (obj: any) => void }
        __blc: { id: string }
      }

      ;(window as unknown as WindowPlus).__blc.id =
        'a23bc91a4d5a6cec42ce87c3124bf160'

      try {
        ;(window as unknown as WindowPlus).lc.sendData({
          evento: nameList,
          nm_email: email,
          vars: {
            nm_email: name,
          },
          vars_json: {},
          lista: {
            nm_lista: nameList,
            atualizar: '1',
            nome: name,
            dt_cadastro: stringData,
            telefone: tel,
            category: cat,
            birth_date: dataNasc,
            cpf,
            Prod_type: prodType,
            aceita_ofertas: privacy,
            optin_BF: optin,
          },
        })
        bfResponseBFForm.innerText = 'Envio Realizado!'
        setOpenModal(true)
      } catch (event) {
        bfResponseBFForm.innerText = 'Falha ao Enviar.'
      }
    }
  }

  return (
    <>
      {openModal ? (
        <ModalAllIn
          formConfirmation="Seu formulário foi enviado com sucesso!"
          description="Ficamos muito felizes com as suas respostas. Em breve, traremos novidades quentinhas de Vivara especialmente para você."
          btnText="IR PARA HOME"
        />
      ) : (
        <div className="form-all-in">
          <h1 className="form-all-in__title">{title}</h1>
          <h2 className="form-all-in__subtitle">{subtitle}</h2>

          <Helmet>
            <script
              src="https://i.btg360.com.br/wf.js"
              type="text/javascript"
            />
          </Helmet>

          <form
            style={{
              color: textcolor,
              backgroundColor: background,
            }}
            className="form-all-in__data"
          >
            <h3
              className="form-all-in__titleform"
              style={{
                color: textcolor,
              }}
            >
              {titleform}
            </h3>
            <div className="form-all-in__data-user">
              <div className="form-all-in__data-user__name">
                <label htmlFor="name">Nome*</label>
                <input type="text" placeholder="Nome" className="input-name" />
              </div>
              <div className="form-all-in__data-user__nascimento">
                <label htmlFor="nascimento">Data de nascimento*</label>
                <InputMask
                  mask="date"
                  placeholder="dd/mm/aaaa"
                  className="input-nascimento"
                  inputMode="numeric"
                />
              </div>
            </div>
            <div className="form-all-in__contact-user">
              <div className="form-all-in__contact-user__email">
                <label htmlFor="email">E-mail*</label>
                <input
                  type="text"
                  placeholder="Seu e-mail"
                  className="input-email"
                />
              </div>
              <div className="form-all-in__contact-user__phone">
                <label htmlFor="phone">Telefone/Celular*</label>
                <InputMask
                  mask="tel"
                  placeholder="(00) 00000-0000"
                  className="input-phone"
                  inputMode="numeric"
                />
              </div>
              <div className="form-all-in__contact-user__cpf">
                <label htmlFor="cpf">CPF</label>
                <InputMask
                  mask="cpf"
                  placeholder="000.000.000-00"
                  className="input-cpf"
                  inputMode="numeric"
                />
              </div>
            </div>
            <div className="form-all-in__observation">
              <span>* Campos obrigatórios.</span>
            </div>
            <div className="form-all-in__wish-category">
              <div className="form-all-in__wish-category__text">
                <span>
                  Quais categorias de produtos te interessam em nosso site?
                </span>
              </div>
              <div className="form-all-in__wish-category__checkbox">
                <label>
                  <input
                    type="checkbox"
                    className="category__checkbox"
                    id="joias"
                  />
                  Joias
                </label>
                <label>
                  <input
                    type="checkbox"
                    className="category__checkbox"
                    id="life by vivara"
                  />
                  Life by Vivara
                </label>
                <label>
                  <input
                    type="checkbox"
                    className="category__checkbox"
                    id="relogios"
                  />
                  Relógios
                </label>
                <label>
                  <input
                    type="checkbox"
                    className="category__checkbox"
                    id="acessorios"
                  />
                  Acessórios
                </label>
              </div>
            </div>
            <div className="form-all-in__wish-products">
              <div className="form-all-in__wish-products__text">
                <span>E quais produtos você procura?</span>
              </div>
              <div className="form-all-in__wish-products__checkbox">
                <label>
                  <input
                    type="checkbox"
                    className="product__checkbox"
                    id="Pingentes"
                  />
                  Pingentes
                </label>
                <label>
                  <input
                    type="checkbox"
                    className="product__checkbox"
                    id="Pulseiras"
                  />
                  Pulseiras
                </label>
                <label>
                  <input
                    type="checkbox"
                    className="product__checkbox"
                    id="Aneis"
                  />
                  Aneis
                </label>
                <label>
                  <input
                    type="checkbox"
                    className="product__checkbox"
                    id="Relogios"
                  />
                  Relógios
                </label>
                <label>
                  <input
                    type="checkbox"
                    className="product__checkbox"
                    id="Brincos"
                  />
                  Brincos
                </label>
                <label>
                  <input
                    type="checkbox"
                    className="product__checkbox"
                    id="Colares"
                  />
                  Colares
                </label>
              </div>
            </div>
            <div className="form-all-in__privacy-policy">
              <label>
                <input
                  type="checkbox"
                  className="product__checkbox"
                  id="policy-agree"
                />
                <span>
                  Declaro ter analisado e compreendido a
                  <a
                    href="https://www.vivara.com.br/institucional/aviso-externo-de-privacidade"
                    target="_blank"
                    rel="noreferrer"
                    className="form-all-in__privacy-policy__link"
                  >
                    Politica de Privacidade
                  </a>
                  e tenho mais de 18 anos de idade.*
                </span>
              </label>
              <label>
                <input
                  type="checkbox"
                  className="product__checkbox"
                  id="marketing-agree"
                />
                <span>
                  Eu aceito receber comunicado de marketing da Vivara e Life by
                  Vivara
                </span>
              </label>
            </div>
            <div className="form-all-in__button-submit">
              <button
                className="btn-send-form"
                style={{
                  backgroundColor: backgroundbutton,
                }}
                onClick={(e) => sendForm(e)}
              >
                {labelbutton}
              </button>
            </div>
          </form>
          <div className="bf-form-box">
            <p id="bf-response" className="bf-response" />
          </div>
        </div>
      )}
    </>
  )
}

export default FormAllIn
