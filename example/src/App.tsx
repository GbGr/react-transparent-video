import React from 'react'
import { TransparentVideo } from 'react-transparent-video'
import VideoBG from './assets/space_bg.mp4'
import VideoWithMask from './assets/video_with_mask.mp4'
import VideoWithMask2 from './assets/element_02_lq.mp4'

const App = () => {
  return (
    <div>
      <video
        loop
        muted
        autoPlay
        src={VideoBG}
        className={'videoBg'}
      />
      <h1>SaSacred</h1>
      <TransparentVideo className='donat' src={VideoWithMask} autoPlay loop muted />
      <TransparentVideo src={VideoWithMask2} autoPlay loop muted />
      <TransparentVideo src={VideoWithMask} autoPlay loop muted />
      <TransparentVideo src={VideoWithMask2} autoPlay loop muted />
    </div>
  )
}

export default App
