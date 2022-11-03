import React from 'react'
import PropTypes from 'prop-types'

export default function HTML(props: {
  htmlAttributes: JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLHtmlElement> &
    React.HtmlHTMLAttributes<HTMLHtmlElement>
  headComponents:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined
  bodyAttributes: JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLBodyElement> &
    React.HTMLAttributes<HTMLBodyElement>
  preBodyComponents:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined
  body: any
  postBodyComponents:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined
}) {
  return (
    // eslint-disable-next-line jsx-a11y/html-has-lang
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key="body"
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
