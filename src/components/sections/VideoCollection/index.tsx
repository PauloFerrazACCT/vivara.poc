import React from 'react'
import Video from 'src/components/common/Video/index'
import './styles.scss'

type VideoCollectionProps = {
  description?: string
  src: string
  settings: {
    controlsOn: boolean
    muteOn: boolean
    playAuto: boolean
    loopingVideo: boolean
  }
}

const VideoCollection = (data: VideoCollectionProps) => {
  const { description, src, settings } = data

  return (
    <div className="collection-container">
      <div className="collection-container__video">
        <Video
          videoSrcURL={src}
          videoTitle=""
          controlsVideo={settings.controlsOn}
          autoVideo={settings.playAuto}
          soundVideo={settings.muteOn}
          loopingVideo={settings.loopingVideo}
        />
      </div>
      {description && description !== '' && (
        <div className="collection-container__text-container">
          <p className="collection-container__text">{description} </p>
        </div>
      )}
    </div>
  )
}

export default VideoCollection
