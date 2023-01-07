import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd'
import axios from 'axios'
import Loader from '../components/Loader'
import Error from '../components/Error'
import AddExcursion from '../components/AddExcursion'
import RemoveExcursion from '../components/RemoveExcursion'
import ExcursionsCalendar from '../components/ExcursionsCalendar'
import AOS from 'aos'
import 'aos/dist/aos.css';
AOS.init({
   
});

function AdminScreen () {
  useEffect(
    () =>
      async function fetchData () {
        if (!JSON.parse(localStorage.getItem('currentUser')).isAdmin) {
          window.location.href = '/home'
        }
      },
    []
  )

  return (
    <div className='ml-3 mt-3 mr-3 bs' data-aos='fade-right'>
      <h2 className='text-center' style={{ fontSize: '30px' }}>
        <b>Admin Panel</b>
      </h2>
      <Tabs defaultActiveKey='1'>
        <Tabs.TabPane tab='Bookings' key='1'>
          <Bookings />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Excursions' key='2'>
          <Excursions />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Add Excursion' key='3'>
          <AddExcursion/>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Remove Excursion' key='4'>
          <RemoveExcursion/>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Users' key='5'>
          <Users />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Calendar' key='6'>
          <ExcursionsCalendar/>
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default AdminScreen

export function Bookings () {
  const [bookings, setbookings] = useState([])
  const [loading, setloading] = useState(true)
  const [error, seterror] = useState()

  useEffect(
    () =>
      async function fetchData () {
        try {
          setloading(true)
          const data = await (await axios.get('/api/bookings/getallbookings'))
            .data
          setbookings(data)
          setloading(false)
        } catch (error) {
          console.log(error)
          setloading(false)
          seterror(true)
        }
      },
    []
  )

  return (
    <div className='row'>
      <div className='col-md-12'>
        <h1>Bookings</h1>
        {loading && <Loader />}

        <table className='table table-bordered table-dark'>
          <thead className='bs'>
            <tr>
              <th>Booking Id</th>
              <th>User Id</th>
              <th>Excursion</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length &&
              bookings.map(booking => {
                return (
                  <tr>
                    <td>{booking._id}</td>
                    <td>{booking.userid}</td>
                    <td>{booking.excursion}</td>
                    <td>{booking.thedate}</td>
                    <td>{booking.status}</td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function Excursions () {
  const [excursions, setexcursions] = useState([])
  const [loading, setloading] = useState(true)
  const [error, seterror] = useState()

  useEffect(
    () =>
      async function fetchData () {
        try {
          const data = await (
            await axios.get('/api/excursions/getallexcursions')
          ).data
          setexcursions(data)
          setloading(false)
        } catch (error) {
          seterror(error)
          console.log(error)
          setloading(false)
        }
      },
    []
  )

  return (
    <div className='row'>
      <div className='col-md-12'>
        <h1>excursions</h1>
        {loading && <Loader />}

        <table className='table table-bordered table-dark'>
          <thead className='bs'>
            <tr>
              <th>Excursion Id</th>
              <th>Name</th>
              <th>Type</th>
              <th>Max Count</th>
            </tr>
          </thead>

          <tbody>
            {excursions.length &&
              excursions.map(excursion => {
                return (
                  <tr>
                    <td>{excursion._id}</td>
                    <td>{excursion.name}</td>
                    <td>{excursion.type}</td>
                    <td>{excursion.maxcount}</td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function Users () {
  const [users, setusers] = useState([])
  const [loading, setloading] = useState(true)
  const [error, seterror] = useState()

  useEffect(
    () =>
      async function fetchData () {
        try {
          const data = await (await axios.get('/api/users/getallusers')).data
          setusers(data)
          setloading(false)
        } catch (error) {
          seterror(error)
          console.log(error)
          setloading(false)
        }
      },
    []
  )

  return (
    <div className='row'>
      <div className='col-md-12'>
        <h1>Users</h1>
        {loading && <Loader />}
        <table className='table table-dark table-bordered'>
          <thead className='bs'>
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Is Admin</th>
            </tr>
          </thead>

          <tbody>
            {users &&
              users.map(user => {
                return (
                  <tr>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.number}</td>
                    <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
