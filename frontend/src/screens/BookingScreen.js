import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loader from '../components/Loader'
import Error from '../components/Error'
import PaymentScreen from './PaymentScreen'
import moment from 'moment'
import StripeCheckout from 'react-stripe-checkout'
// import PayPalCheckout from 'react-paypal-js'
// import { StripeCheckout } from '@stripe/react-stripe-js';
import Swal from 'sweetalert2'
import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init({})

function BookingScreen ({ match }) {
  // api setup
  const [excursion, setexcursions] = useState()
  const [loading, setloading] = useState(true) // NOTE: Some pages will require this to load properly ("true")
  const [error, seterror] = useState()

  const excursionid = match.params.excursionid
  const thedate = match.params.thedate

  const [totalamount, settotalamount] = useState()
  /* initial number of tickets is 1 */
  const [numberOfTickets, setNumberOfTickets] = useState(1)

  const [hasRedirected, setHasRedirected] = useState(false)
  const [hasRendered, setHasRendered] = useState(false)

  useEffect(
    () =>
      async function fetchData () {
        //console.log(localStorage.getItem('currentUser').toString())
        if (!localStorage.getItem('currentUser')) {
          window.location.href = '/login'
        }

        try {
          setloading(true)

          const data = (
            await axios.post('/api/excursions/getexcursionbyid', {
              excursionid: excursionid
            })
          ).data
          //settotalamount(data.price * tickets)
          settotalamount(data.price)
          setexcursions(data)
          setloading(false)
        } catch (error) {
          setloading(false)
          seterror(true)
          console.log(error)
        }
      },
    []
  )

  /* handle changes to the number of tickets from input field */
  const handleNumberOfTicketsChange = event => {
    const newNumberOfTickets = event.target.value
    settotalamount(newNumberOfTickets * excursion.price)
    setNumberOfTickets(newNumberOfTickets)
  }

  /* attempt to log the user booking details and add to database */
  async function onToken (token) {
    console.log(token)
    const bookingDetails = {
      excursion,
      userid: JSON.parse(localStorage.getItem('currentUser'))._id,
      thedate,
      totalamount,
      token
    }

    try {
      setloading(true)
      const result = await axios.post(
        '/api/bookings/bookexcursion',
        bookingDetails
      )
      setloading(false)
      Swal.fire(
        'Booking Successful!',
        'Your adventure awaits!',
        'success'
      ).then(result => {
        window.location.href = '/profile'
      })
    } catch (error) {
      console.log(error)
      setloading(false)
      Swal.fire('Ooops!', 'Something went wrong, please try again.', 'error')
    }
  }

  const redirectToPaymentsPage = () => {
    //Redirect to the payments page
    window.location.href = '/payment-options'
  }

  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
 

  return (
    <div className='m-5 ' data-aos='flip-down'>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <div>
          <style>
            {`
        html,
          body{
            // background-color : #A8A390;
            background-image : url('/images/punta_cana_beach.png');
            background-size: cover;
            background-attachment: fixed;

            
          }
        `}
          </style>
          <div
            className='row justify-content-center mt-5 bs'
            style={{ backgroundColor: '#A8A390 ', borderRadius: '10px' }}
          >
            <div className='col-md-6'>
              <h1>{excursion.name}</h1>
              <img src={excursion.imageurls[0]} className='d-block  bigimg' />
            </div>

            <div className='col-md-6'>
              <div style={{ textAlign: 'right' }}>
                <h1>Booking Details</h1>
                <hr />
                <b>
                  <p>
                    Name :{' '}
                    {JSON.parse(localStorage.getItem('currentUser')).name}
                  </p>
                  <p>Date : {match.params.thedate}</p>
                  {/* <p>Time : </p> */}
                </b>
              </div>

              <div style={{ textAlign: 'right' }}>
                <h1>Amount</h1>
                <hr />
                <b>
                  {excursion.type !== 'Private' ? (
                    <>
                      <p>Price Per Person: ${excursion.price}.00 </p>
                      <p>Total Amount : ${totalamount}.00 </p>
                      <p>
                        Ticket(s):{' '}
                        <input
                          type='number'
                          value={numberOfTickets}
                          min={1}
                          max={50}
                          onChange={handleNumberOfTicketsChange}
                        />
                      </p>
                    </>
                  ) : (
                    <p>Price: ${excursion.price}.00 </p>
                  )}
                </b>
              </div>

              <div style={{ float: 'right' }}>
                <button
                  className='btn btn-primary m-2'
                  onClick={() => {
                    // Redirect to the Google Form's URL
                    window.location.href = `https://docs.google.com/forms/d/e/1FAIpQLSdbv40Y9h0_mP3XWOsYchSWGaTZMUfSmk6GjBxe79joIq4w2g/viewform?usp=pp_url&entry.1186382749=${currentUser.name}&entry.1281520525=${currentUser.number}&entry.219322626=${currentUser.email}&entry.1372911005=${excursion.name}&entry.312190220=${thedate}&entry.407071960=${numberOfTickets}&entry.729351709=$${totalamount}.00`
                  }}
                >
                  Book
                </button>

                {/* <Link onClick={() =>window.location.href=`https://docs.google.com/forms/d/e/1FAIpQLSdbv40Y9h0_mP3XWOsYchSWGaTZMUfSmk6GjBxe79joIq4w2g/viewform?usp=sf_link`}>
                
                <button className='btn btn-primary m-2'>Book</button>
              </Link> */}
              </div>
            </div>
            {/* <PaymentScreen price={excursion.price} totalamount={totalamount} /> */}
          </div>
        </div>
      )}
    </div>
  )
}

export default BookingScreen

// export function CheckoutForm () {}
