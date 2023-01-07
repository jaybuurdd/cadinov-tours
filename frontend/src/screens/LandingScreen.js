import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init({
  duration: 2000
})

//function LandingScreen () {

class LandingScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      handleClick: () => {
        window.location.href = '/home';
      }
    };
  }


  componentDidMount() {

        // Get the video element
        const videoElement = document.getElementById('my-video');
      
        // Check if the video element exists and if it supports the play method
        if (videoElement && videoElement.play) {
          // Try to play the video
          videoElement.play()
            .then(() => {
              // Video was successfully played

              console.log('success!')
            })
            .catch(error => {
              // An error occurred, such as the user clicking on the video to pause it
              console.error(error);
            });
        };
      }
  
  
  /* forces the page to reload to home screen once
    button is clicked */
  // const history = useHistory()

  // const handleClick = () => {
  //   window.location.href = '/home'
  // }

  
render(){

    return (

      <div className='row landing justify-content-center'>
          {/* prevents exposed whitespaces around webpage*/}
          <style>
          {`
            body {
              overflow: hidden;
            }
          `}
        </style>
              <video
                  src='./videos/cadinov-intro.mp4'
                  autoPlay
                  loop
                  style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '1700px',
                  height: '1260px',
                  zIndex: -1,
                  objectFit:'cover'
                  }}
              />
              

        <div
          className='col-md-10 my-auto text-center'
          style={{ borderRight: '8px solid white',  
          background: 'linear-gradient(to bottom right, rgba(23, 85, 106, 1), rgba(204, 204, 204, 0.3))',
          height: '420px'
    
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
    
          <img src='./images/cadinov_logo.png' className='pulse-image'
          alt='Cadinov Logo' data-aos='zoom-in'
          style={{width : '300px', height : '300px'}} />
          <h1 data-aos='zoom-out' style={{ color: 'white' }}>
            "Promoting the development of national and international tourism"
          </h1>
          <button className='btn btn-primary pulse-button' onClick={this.state.handleClick}>
            Begin Your Adventure
          </button>
        </div>
      </div>
    );
  }
}

export default LandingScreen
