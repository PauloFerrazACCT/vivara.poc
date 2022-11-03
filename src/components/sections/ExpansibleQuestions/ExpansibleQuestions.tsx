import React, { useState, useRef, useEffect } from 'react'
import type { RawDraftContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import LeftArrowBlack from 'src/images/svg/icon-arrow-left-black'

import './expansible-questions.scss'

type ExpansibleQuestionProps = {
  question: string
  answer: string
  background: string
  textcolor: string
}

function ExpansibleQuestions({
  question,
  answer,
  background,
  textcolor,
}: ExpansibleQuestionProps) {
  const parsedContent = JSON.parse(answer) as RawDraftContentState
  const answerHtml = draftToHtml(parsedContent)
  const [showQuestion, setShowQuestion] = useState<boolean>(false)
  const [parentElementHeight, setParentElementHeight] = useState(40)
  const elementRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const elementTitle = elementRef.current?.querySelector(
      '.expansible-questions-title'
    )

    setParentElementHeight(elementTitle?.clientHeight ?? 40)
  }, [])

  const showMore = function () {
    setShowQuestion(!showQuestion)

    const elementTitle = elementRef.current?.querySelector(
      '.expansible-questions-title'
    )

    const elementAnswer = elementRef.current?.querySelector(
      '.expansible-questions-answer'
    )

    const elementButton = elementRef.current?.querySelector(
      '.expansible-questions-button'
    )

    if (!showQuestion) {
      return setParentElementHeight(
        (elementTitle?.clientHeight ?? 0) +
          (elementAnswer?.clientHeight ?? 0) +
          (elementButton?.clientHeight ?? 0)
      )
    }

    return setParentElementHeight(elementTitle?.clientHeight ?? 0)
  }

  return (
    <>
      <div
        className={`a-expansible-questions-container ${
          showQuestion ? 'openQuestion' : ''
        }`}
        ref={elementRef}
        style={{
          height: `${parentElementHeight}px`,
          backgroundColor: background,
        }}
      >
        <div className="expansible-questions-container">
          <div className="expansible-questions-title">
            <h4 style={{ color: textcolor }}>{question}</h4>
          </div>
          <div
            className="expansible-questions-answer"
            dangerouslySetInnerHTML={{ __html: answerHtml }}
          />
        </div>
        <button
          aria-label="showAndClose"
          className={`expansible-questions-button ${
            showQuestion ? 'openQuestion' : ''
          }`}
          onClick={() => showMore()}
        >
          <LeftArrowBlack />
        </button>
      </div>
    </>
  )
}

export default ExpansibleQuestions
