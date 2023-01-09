import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Excursion from '../components/Excursion'
import { DatePicker } from 'antd'
import moment from 'moment'
import 'antd/dist/antd.min.css'
import Loader from '../components/Loader'
import Error from '../components/Error'
import axiosInstance from '../components/AxiosInstance'

function HomeScreen () {
  // api setup
  const [excursions, setexcursions] = useState([])
  const [originalexcursions, setoriginalexcursions] = useState([])
  const [availableexcursions, setavailableexcursions] = useState([])
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState()

  const [thedate, setdate] = useState('')

  const [searchkey, setsearchkey] = useState('')
  const [type, settype] = useState('')

  // Call filterBySearch whenever searchkey changes
  useEffect(() => {
    filterBySearch()
  }, [searchkey])

  useEffect(
    () =>
      // Fetch list of excursions from API
      async function fetchData () {
        // try {
        //   const data = (await axiosInstance.get('/api/excursions/getallexcursions'))
        //     .data

        //   setexcursions(data)
        //   setavailableexcursions(data)
        //   setoriginalexcursions(data)
        //   setloading(false)
        // } catch (error) {
        //   seterror(error)
        //   console.log(error)
        //   setloading(false)
        // }
        await axios.get('https://cadinov-api.onrender.com/api/excursions/getallexcursions')
          .then((response) => {
            
            console.log(response)
            setexcursions(response.data)
            setavailableexcursions(response.data)
            setoriginalexcursions(response.data)
            setloading(false)
          })
          .catch((error) => {
            
            seterror(error)
            console.log(error)
            setloading(false)

          })
      },
    []
  )

  function filterByDate (date) {
    setdate(moment(date).format('MM-DD-YYYY'))
    console.log(moment(date).format('MM-DD-YYYY'))

    var tempexcursions = []
    // get the excursion day
    const selectedday = moment(date).format('dddd')
    console.log(selectedday)

    if (selectedday === 'Invalid date') {
      console.log('date no longer provided')
      setexcursions(excursions)
    } else {
      // loop through list of excursions
      for (const excursion of availableexcursions) {
        // see if excursion is available on the date selected
        const availableday = excursion.availability.includes(selectedday)
        //const availableday = availableexcursions.filter(excursion=>excursion.availability.includes(selectedday))

        // if available move to temp list
        if (availableday === true) {
          tempexcursions.push(excursion)
        }

        // update excursions page
        setexcursions(tempexcursions)
      }
    }
  }

  const disabledDate = current => {
    // Disable dates that are earlier than today and today
    return current && current < moment().endOf('day')
    // Disable dates that are earlier than today and today and a day ahead of today
    //return current && current < moment().endOf('day').add(1,'days')
  }

  function filterBySearch () {
    const update = originalexcursions.filter(excursion =>
      excursion.name.toLowerCase().includes(searchkey.toLowerCase())
    );
    setexcursions(update);
    
  }

  function filterByType (e) {
    settype(e)
    console.log(e)

    if (e !== 'all') {
      const update = availableexcursions.filter(excursion =>
        excursion.type.toLowerCase().includes(e.toLowerCase())
      )
      setexcursions(update)
    } else {
      setexcursions(availableexcursions)
    }
  }

  console.log(excursions)
  return (
    <div className='background'>
      <div className='mt-5'>
        <style>
          {`
        html,
          body{
            // background-color : #A8A390;
            background-image: url(../images/punta_cana_beach.png);
            background-size: cover;
            background-attachment: fixed;


            
          }
        `}
        </style>

        <div
          className='container'
          style={{ backgroundColor: '#17556A ', borderRadius: '10px' }}
        >
          <div className='row bs p-3 mt-5'>
            <div className='col-md-4'>
              <DatePicker
                style={{ height: '38px' }}
                format='MM-DD-YYYY'
                onChange={filterByDate}
                disabledDate={disabledDate}
                className='m-3'
              />
            </div>

            <div className='col-md-4 ml-3'>
              <input
                type='text'
                className='form-control'
                placeholder='Search Excursions'
                // onKeyUp={filterBySearch}
                value={searchkey}
                onChange={e => {
                  setsearchkey(e.target.value)
                }}
              />
            </div>

            <div className='col-md-3'>
              <select
                className='form-control'
                value={type}
                onChange={e => {
                  filterByType(e.target.value)
                }}
              >
                <option value='all'>All</option>
                <option value='family'>Family</option>
                <option value='public'>Public</option>
                <option value='private'>Private</option>
              </select>
            </div>
          </div>
        </div>

        <div className='row justify-content-center mt-5'>
          {loading ? (
            <Loader />
          ) : (
            excursions.map(excursion => {
              return (
                <div className='col-md-8 mt-3' data-aos='zoom-out-up'>
                  <Excursion excursion={excursion} thedate={thedate} />
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default HomeScreen
