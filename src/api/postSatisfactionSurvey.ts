import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import axios from 'axios'

export default async function postSatisfactionSurvey(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const {
    userDocument,
    userEmail,
    dataDoCaso,
    numeroCaso,
    atendente,
    answerDate,
    answerValue,
    answerObs,
  } = req.body

  if (req.method === 'POST') {
    try {
      const { data } = await axios.get(
        `https://script.google.com/macros/s/${process.env.SCRIPTGOOGLETOKEN}/exec?userDocument=${userDocument}&userEmail=${userEmail}&dataDoCaso=${dataDoCaso}&numeroCaso=${numeroCaso}&atendente=${atendente}&answerDate=${answerDate}&answerValue=${answerValue}&answerObs=${answerObs}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      )

      res.send(JSON.stringify(data))
    } catch (err) {
      throw new Error(`Um erro ocorreu: ${err.message}`)
    }
  }
}
