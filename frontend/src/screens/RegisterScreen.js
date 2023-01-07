import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import Error from '../components/Error'
import Success from '../components/Success'

function RegisterScreen () {
  // for setting user input fields
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [number, setnumber] = useState('')
  const [password, setpassword] = useState('')
  const [cpassword, setcpassword] = useState('')

  const [loading, setloading] = useState(false) // NOTE: Some pages will require this to load properly ("true")
  const [error, seterror] = useState()
  const [success, setsuccess] = useState()
  const [emailcheck, setemailcheck] = useState('')

  async function register () {
    if (password == cpassword ) {
      const user = {
        name,
        email,
        number,
        password,
        cpassword
      }

      // Check if password appropriate length
      if (password.length < 8) {
          // Display error message
          alert("Password must be at least 8 characters long!")
          return
      }
     
       // Check if any required fields are empty
       if (!name || !email || !number || !password) {
        alert('Please fill out all fields')
        return
      }

      try {
        setloading(true)
        const result = await axios.post('/api/users/register', user).data
        
        
        setloading(false)
        setsuccess(true)

        
        setname('')
        setemail('')
        setnumber('')
        setpassword('')
        setcpassword('')

        window.location.href = '/login'

      } catch (error) {
        console.log(error)
        setloading(false)
        seterror(true)
      }

      
    } else {
      alert("Passwords don't match!")
    }
  }


  return (
    <div>

        {loading && (<Loader/>)}
        {error && (<Error/>)}
        
      <div className='row justify-content-center mt-5'>
        <div className='col-md-5'>
        {success && (<Success message='Registration Success'/>)}
          <div className='bs'>
            
            <h2>Register</h2>

            <input
              type='text'
              className='form-control'
              placeholder='Name'
              value={name}
              onChange={e => {
                setname(e.target.value)
              }}
              required
            />
            <input
              type='text'
              className='form-control'
              placeholder='Email'
              value={email}
              onChange={e => {
                setemail(e.target.value)
              }}
              required
            />
            <input
              type='text'
              className='form-control'
              placeholder='Phone Number'
              value={number}
              onChange={e => {
                setnumber(e.target.value)
              }}
              pattern='[0-9]*'
              minLength='10'
              maxLength='10'
              required
            />
            <input
              type='password'
              className='form-control'
              placeholder='Password'
              value={password}
              onChange={e => {
                setpassword(e.target.value)
              }}
              required
              minLength='8'
            />
            <input
              type='password'
              className='form-control'
              placeholder='Confirm Password'
              value={cpassword}
              onChange={e => {
                setcpassword(e.target.value)
              }}
              required
            />

            <button className='btn btn-primary mt-3' onClick={register}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterScreen
