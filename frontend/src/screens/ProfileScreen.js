import React, { useEffect, useState } from 'react'
import { Tabs, Divider, Tag } from 'antd'
import styled from '@emotion/styled';
import axios from 'axios'
import Loader from '../components/Loader'
import Error from '../components/Error'
import AOS from 'aos'
import 'aos/dist/aos.css';
AOS.init({
   
});


const Container = styled.div`
  margin: 0 3rem;
  margin-top: 3rem;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
`

const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1rem;
`

const Text = styled.p`
  font-size: 1.25rem;
  margin-top: 0.5rem;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`

const Input = styled.input`
  width: 60%;
  height: 2rem;
  font-size: 1rem;
  padding: 0.5rem;
  border: 1px solid lightgray;
  border-radius: 5px;
`

const Button = styled.button`
  width: 20%;
  height: 2rem;
  font-size: 1rem;
  margin-top: 1rem;
  background-color: #256395;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #2A70A9;
  }
`

function ProfileScreen () {

  const user = JSON.parse(localStorage.getItem('currentUser'))

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [isAdmin, setIsAdmin] = useState(user.isAdmin)  
  const [number, setNumber] = useState(user.number)

  useEffect(() => {
    if (!user) {
      window.location.href = '/login'
    }
  }, [])

  

  function handleChange(event) {
    setNumber(event.target.value)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const updatedUser = await axios.post('/api/users/update-phone-number', { userId: user._id, newNumber: number })
      console.log(updatedUser)
      setName(updatedUser.name)
      setEmail(updatedUser.email)
      setIsAdmin(updatedUser.isAdmin)
      localStorage.setItem('currentUser', JSON.stringify(updatedUser))
    } catch (error) {
      console.error(error)
    }
  }
  

  console.log('number: ' + number)

  return (
    <Container>
      <Title>User Dashboard</Title>
      <Tabs defaultActiveKey='1' >
        <Tabs.TabPane tab='Profile' key='1'>
          <Subtitle>My Profile</Subtitle>

          <br />

          <Text><b>Name</b> : {user.name}</Text>
          <Text><b>Email</b> : {user.email}</Text>     
          <Text><b>Phone Number</b> : {user.number}</Text>
          <Text><b>Account Type</b> : {user.isAdmin ? 'Admin' : 'User'}</Text>
        </Tabs.TabPane>
        {/* <Tabs.TabPane tab='Bookings' key='2'>
          <MyBookings/>
        </Tabs.TabPane> */}
      </Tabs>
    </Container>
  )
}

export default ProfileScreen

export function MyBookings () {
  const user = JSON.parse(localStorage.getItem('currentUser'))
  const [bookings, setbookings] = useState([])
  const [loading, setloading] = useState(false) // NOTE: Some pages will require this to load properly ("true")
  const [error, seterror] = useState()
 
  useEffect(
    () =>
      async function fetchData () {
    try {

      setloading(true)
      const data = await (
        await axios.post('/api/bookings/getbookingsbyuserid', { userid: user._id })
      ).data
      console.log(data)
      setbookings(data)
      setloading(false)
    } catch (error) {
      console.log(error)
      setloading(false)
      seterror(error)
    }
  }, [])


  async function cancelBooking(bookingid, excursionid) {

    try {
    
      setloading(true)
      const result = await (await axios.post("/api/bookings/cancelbooking", {bookingid, excursionid})).data
      console.log(result)
      setloading(false)

    } catch (error) {
      console.log(error)
      setloading(false)
    }

  }

  async function checkExpiration() {
    console.log("Checking for expiration...")
  }

  return (
    <div>
      <div className='row'>
        <div className='col-md-6'>

          {loading && <Loader/>}
          {bookings && (bookings.map(booking=>{

            return <div className='bs'>
              <h1> {booking.excursion} </h1>
              <p> <b>TransactionId</b> : {booking._id} </p>
              <p> <b>Excursion Date</b> : {booking.thedate} </p>
              <p> <b>Amount</b> : ${booking.totalamount}.00 </p>
              <p> <b>Status</b> : {booking.status == 'cancelled' ? (<Tag color='red'>CANCELLED</Tag>) : (<Tag color='green'>CONFIRMED</Tag>)} </p>

             
              
              
              {booking.status !== 'cancelled' && (
                  <div className='text-right'>
                  <button className='btn btn-primary' onClick={()=>{cancelBooking(booking._id, booking.excursionid)}}> CANCEL BOOKING</button> 
  
                </div>
              )}
            

            </div>
          }))}


        </div>
      </div>
    </div>
  )
}
