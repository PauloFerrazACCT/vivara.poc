import React, { useEffect, useState } from 'react'
import Video from 'src/components/common/Video/index'
import './styles.scss'

type VideoFullScreenProps = {
  sources: any
  settings: {
    controlsOn: boolean
    muteOn: boolean
    playAuto: boolean
    loopingVideo: boolean
  }
}

const VideoFullScreen = (data: VideoFullScreenProps) => {
  const { sources, settings } = data

  const [isMobile, setIsMobile] = useState<boolean>()

  const sourceMobile = sources?.filter((source: any) => {
    return source.media === '(max-width: 48em)'
  })

  const sourceDesktop = sources?.filter((source: any) => {
    return source.media === '(min-width: 48em)'
  })

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024)
    window.addEventListener('resize', () =>
      setIsMobile(window.innerWidth < 1024)
    )
  }, [])

  return (
    <>
      {sources !== undefined && (
        <>
          {isMobile ? (
            <div className="videofull-container__video_mobile">
              <Video
                videoSrcURL={sourceMobile[0].src}
                videoTitle=""
                controlsVideo={settings?.controlsOn}
                autoVideo={settings?.playAuto}
                soundVideo={settings?.muteOn}
                loopingVideo={settings?.loopingVideo}
              />
            </div>
          ) : (
            <div className="videofull-container__video">
              <Video
                videoSrcURL={sourceDesktop[0].src}
                videoTitle=""
                controlsVideo={settings?.controlsOn}
                autoVideo={settings?.playAuto}
                soundVideo={settings?.muteOn}
                loopingVideo={settings?.loopingVideo}
              />
            </div>
          )}
        </>
      )}
    </>
  )
}

export default VideoFullScreen
