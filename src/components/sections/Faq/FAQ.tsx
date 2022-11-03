import React from 'react'
import { Helmet } from 'react-helmet'

import ExpansibleQuestions from '../ExpansibleQuestions'

import './faq.scss'

type ExpansibleQuestionProps = {
  question: string
  answer: string
}

type Props = {
  questions: ExpansibleQuestionProps[]
  id?: string
  title?: string
  subtitle?: string
  background: string
  textcolor: string
}

function FAQ({ id, title, subtitle, background, textcolor, questions }: Props) {
  const faqSchema: any = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      questions.map((item) => {
        return {
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: JSON.parse(item.answer).blocks[0].text,
          },
        }
      }),
    ],
  }

  return (
    <div id={id}>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <div
        className="expansible-questions-titlesfaq"
        style={{ color: textcolor }}
      >
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
      </div>
      {questions?.map((item, index) => (
        <ExpansibleQuestions
          key={index}
          question={item.question}
          answer={item.answer}
          background={background}
          textcolor={textcolor}
        />
      ))}
    </div>
  )
}

export default FAQ
