import React from 'react'
import './releaseTag.scss'

interface Props {
  variant: string
}

function ReleaseTag({ variant }: Props) {
  return (
    <div className={`releaseTag-container__${variant}`}>
      <p className={`releaseTag-text__${variant}`}>LANÇAMENTO</p>
    </div>
  )
}

export default ReleaseTag
