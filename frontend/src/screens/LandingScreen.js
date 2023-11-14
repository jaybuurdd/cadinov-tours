import React, { useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init({
  duration: 2000
})

const LandingScreen = () => {
  const history = useHistory()
  const videoRef = useRef() // create a ref for the video element

  useEffect(() => {
    // set the callback for the 'onLoadedData' event within the useEffect
    const videoElement = videoRef.current
    if (videoElement) {
      videoElement.onloadeddata = () => {
        videoElement
          .play()
          .then(() => {
            // console.log('Video was successfully played')
          })
          .catch(error => {
            console.error(error)
          })
      }
    }

    return () => {
      // clean up event listener when the component is unmounted
      if (videoElement) {
        videoElement.onloadeddata = null
      }
    }
  }, [])

  const handleClick = () => {
    history.push('/home')
  }

  // add ref to the video element
  return (
    <div className='row landing justify-content-center'>
      <style>
        {`
          body {
            overflow: hidden;
          }
        `}
      </style>
      <video
        ref={videoRef}
        src='./videos/cadinov-intro.mp4'
        autoPlay
        loop
        muted // this line is new
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '120vw',
          height: '115vh',
          zIndex: -1,
          objectFit: 'cover'
        }}
      />
      <div
        className='col-xs-12 col-sm-10 col-md-10 my-auto text-center'
        style={{
          borderRight: '8px solid white',
          background:
            'linear-gradient(to bottom right, rgba(23, 85, 106, 1), rgba(204, 204, 204, 0.3))',
          height: '50vh',
          display: 'flex', // new
          flexDirection: 'column', // new
          justifyContent: 'center', // new
          alignItems: 'center', // new
          flex: 1,
          position: 'relative', // this line is new
          top: '-30vh'
        }}
      >
        <style>
          {`
            .pulse-button {
              animation: pulse 2s infinite;
            }
            
            @keyframes pulse {
              0% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.05);
              }
              100% {
                transform: scale(1);
              }
            }
          `}
        </style>
        <img
          src='./images/cadinov_logo.png'
          className='pulse-image'
          alt='Cadinov Logo'
          data-aos='zoom-in'
          style={{
            width: '20vw',
            height: '20vw'
          }}
        />
        <h1
          data-aos='zoom-out'
          style={{
            color: 'white',
            fontSize: '3vw'
          }}
        >
          "Promoting the development of national and international tourism"
        </h1>
        <button className='btn btn-primary pulse-button' onClick={handleClick}>
          Begin Your Adventure
        </button>
      </div>
    </div>
  )
}

export default LandingScreen
