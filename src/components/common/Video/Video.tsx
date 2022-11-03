import React from 'react'

interface Props {
  videoSrcURL: string
  videoTitle: string
  controlsVideo: boolean
  autoVideo: boolean
  soundVideo: boolean
  loopingVideo: boolean
  videoId?: string
}

const Video = ({
  videoSrcURL,
  videoTitle,
  controlsVideo,
  autoVideo,
  soundVideo,
  loopingVideo,
  videoId,
}: Props) => (
  <div className="video">
    <video
      id={videoId ?? ''}
      src={videoSrcURL}
      controls={controlsVideo}
      autoPlay={autoVideo}
      muted={soundVideo}
      loop={loopingVideo}
      title={videoTitle}
      playsInline
      preload="metadata"
    >
      <source src="movie.mp4" type="video/mp4" />
      <track
        default
        kind="captions"
        srcLang="pt-br"
        src=""
        label="portuguese_captions"
      />
    </video>
  </div>
)

export default Video
