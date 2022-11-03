import React, { useState } from 'react'
import axios from 'axios'

import './satisfaction-survey.scss'

const SatisfactionSurvey = () => {
  const [disabledButton, setDisabledButton] = useState<boolean>(true)
  const [scoreValue, setScoreValue] = useState<number>()
  const [commentValue, setCommentValue] = useState<string>('')
  const [satisfactionSurveySent, setSatisfactionSurveySent] =
    useState<boolean>(false)

  const newAnswerDateSatisfaction = new Intl.DateTimeFormat('pt-BR').format(
    new Date()
  )

  const arr = Array.from({ length: 11 }, (_x, i) => i)

  const getClassByValue = (value: number) => {
    let result = ''

    if (value === scoreValue) {
      result = 'selected '
    }

    if (value < 7) {
      result += 'red'

      return result
    }

    if (value >= 7 && value < 9) {
      result += 'yellow'

      return result
    }

    result += 'green'

    return result
  }

  const satisfactionSurveySend = async () => {
    try {
      await axios.post('/api/postSatisfactionSurvey', {
        userDocument: '',
        userEmail: '',
        dataDoCaso: '',
        numeroCaso: '',
        atendente: '',
        answerDate: newAnswerDateSatisfaction,
        answerValue: scoreValue,
        answerObs: commentValue,
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="satisfaction-survey-container">
      <div className="satisfaction-survey-content">
        {satisfactionSurveySent === false ? (
          <>
            <div>
              <h1>
                1. Em uma escala de 0 a 10, o quanto você avalia nosso
                atendimento?
              </h1>
            </div>

            <div className="recommend-score">
              <span>Não indicaria</span>
              <span>Com certeza indicaria</span>
            </div>

            <div className="button-score">
              {arr.map((item: number) => {
                return (
                  <button
                    className={getClassByValue(item)}
                    type="button"
                    key={item}
                    onClick={(e) => {
                      e.preventDefault()
                      setScoreValue(item)
                      setDisabledButton(false)
                    }}
                  >
                    {item}
                  </button>
                )
              })}
            </div>

            <div>
              <h1>2. Em poucas palavras, descreva o que motivou sua nota</h1>
            </div>

            <textarea
              value={commentValue}
              onChange={(e) => {
                e.preventDefault()
                setCommentValue(e.target.value)
                setDisabledButton(false)
              }}
            />

            <button
              className="button-send"
              type="submit"
              disabled={disabledButton}
              onClick={(e) => {
                e.preventDefault()
                satisfactionSurveySend()
                setSatisfactionSurveySent(true)
              }}
            >
              Enviar Resposta
            </button>
          </>
        ) : (
          <div>
            <h1>Muito obrigado por participar da nossa pesquisa!</h1>
          </div>
        )}
      </div>
    </div>
  )
}

export default SatisfactionSurvey
