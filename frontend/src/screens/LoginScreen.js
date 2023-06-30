import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import axios from '../components/AxiosInstance'
import Loader from '../components/Loader'
import Error from '../components/Error'




function LoginScreen () {
  // for setting user input fields
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const [loading, setloading] = useState(false) // NOTE: Some pages will require this to load properly ("true")
  const [error, seterror] = useState()

//   useEffect(() => {

//     if(localStorage.getItem('currentUser'))
//     {
//         window.location.href='/'
//     }
  
// }, [])

  async function login () {

    const user = {
      email,
      password
    }

    await axios.post('api/users/login', user)
      .then((response) => {

        setloading(true)
        setloading(false)
        localStorage.setItem('currentUser', JSON.stringify(response))
        
        window.location.href='/home'

      })
      .catch((error) => {

        setloading(false)
        seterror(true)

      })

  }

  return (
    <div>
       {loading && (<Loader/>)}
      <div className='row justify-content-center mt-5'>
        <div className='col-md-5 mt-5'>
         {error && <Error message='Invalid Credentials'/>}
          <div className='bs'>
            <h2>Login</h2>

            <input
              type='text'
              className='form-control'
              placeholder='Email'
              value={email}
              onChange={e => {
                setemail(e.target.value)
              }}
            />
            <input
              type='password'
              className='form-control'
              placeholder='Password'
              value={password}
              onChange={e => {
                setpassword(e.target.value)
              }}
            />

            <button className='btn btn-primary mt-3' onClick={login}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
