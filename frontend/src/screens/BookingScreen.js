import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';

// import axios from 'axios'
import Loader from '../components/Loader'
import Error from '../components/Error'
import PaymentScreen from './PaymentScreen'
import axios from '../components/AxiosInstance'
import Swal from 'sweetalert2'
import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init({})

function BookingScreen ({ match }) {
  // api setup
  const history = useHistory();
  const [excursion, setexcursions] = useState()
  const [loading, setloading] = useState(true)
  const [error, seterror] = useState()

  const excursionid = match.params.excursionid
  const thedate = match.params.thedate

  const [totalamount, settotalamount] = useState()

  const [numberOfTickets, setNumberOfTickets] = useState(1)

  function fetchBookings () {
    async function fetchData () {
      if (!localStorage.getItem('currentUser')) {
        window.location.href = '/login'
      }

      await axios
        .post('/api/excursions/getexcursionbyid', { excursionid: excursionid })
        .then(response => {
          settotalamount(response.data.price)
          setexcursions(response)
          // console.log(response)
          setloading(false)
        })
        .catch(error => {
          setloading(false)
          seterror(true)
          // console.log(error)
        })
    }

    fetchData()
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  const handleNumberOfTicketsChange = event => {
    const newNumberOfTickets = event.target.value
    const newTotalAmount = newNumberOfTickets * excursion.data.price
    settotalamount(newTotalAmount)
    setNumberOfTickets(newNumberOfTickets)
  }

  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  return (
    <div className='m-5' data-aos='flip-down'>
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
              <h1>{excursion.data.name}</h1>
              <img
                src={excursion.data.imageurls[0]}
                className='d-block bigimg'
              />
            </div>

            <div className='col-md-6'>
              <div style={{ textAlign: 'right' }}>
                <h1>Booking Details</h1>
                <hr />
                <b>
                  <p>Name : {currentUser.data.name}</p>
                  <p>Date : {match.params.thedate}</p>
                </b>
              </div>
              <div style={{ textAlign: 'right' }}>
                <h1>Amount</h1>
                <hr />
                <b>
                  {excursion.data.type !== 'Private' ? (
                    <>
                      <p>Price Per Person: ${excursion.data.price}.00 </p>
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
                    <p>Price: ${excursion.data.price}.00 </p>
                  )}
                </b>
              </div>
              ;
              <div style={{ float: 'right' }}>
                <button
                  className='btn btn-primary m-2'
                  onClick={() => {
                    const details = {
                      excursion: excursion,
                      userid: currentUser.data._id,
                      thedate: thedate,
                      totalamount: totalamount,
                      token: currentUser
                    };

                    history.push(`/payment-options?details=${encodeURIComponent(JSON.stringify(details))}`)
                  }}
                >
                  Book
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BookingScreen

// import React, { useState, useEffect } from 'react'
// // import axios from 'axios'
// import Loader from '../components/Loader'
// import Error from '../components/Error'
// import PaymentScreen from './PaymentScreen'
// import axios from '../components/AxiosInstance'
// import Swal from 'sweetalert2'
// import AOS from 'aos'
// import 'aos/dist/aos.css'
// AOS.init({})

// function BookingScreen ({ match }) {
//   // api setup
//   const [excursion, setexcursions] = useState()
//   const [loading, setloading] = useState(true) // NOTE: Some pages will require this to load properly ("true")
//   const [error, seterror] = useState()

//   const excursionid = match.params.excursionid
//   const thedate = match.params.thedate

//   const [totalamount, settotalamount] = useState()
//   const [bookingDetails, setBookingDetails] = useState({
//     excursion: null,
//     userid: null,
//     thedate: null,
//     totalamount: null,
//     token: null
//   })
//   /* initial number of tickets is 1 */
//   const [numberOfTickets, setNumberOfTickets] = useState(1)

//   function fetchBookings(){

//       async function fetchData () {
//         //console.log(localStorage.getItem('currentUser').toString())
//         if (!localStorage.getItem('currentUser')) {
//           window.location.href = '/login'
//         }

//         await axios.post('/api/excursions/getexcursionbyid', { excursionid: excursionid})
//         .then((response) => {

//           settotalamount(response.data.price)
//           setexcursions(response)
//           console.log(response)
//           setloading(false)

//         })
//         .catch((error) => {
//           setloading(false)
//           seterror(true)
//           console.log(error)
//         })
//       }

//       fetchData()
//   }

//   useEffect(() => {
//     fetchBookings()
//   }, [])

//   /* handle changes to the number of tickets from input field */
//   const handleNumberOfTicketsChange = event => {
//     const newNumberOfTickets = event.target.value
//     settotalamount(newNumberOfTickets * excursion.data.price)
//     setNumberOfTickets(newNumberOfTickets)
//   }

//   /* attempt to log the user booking details and add to database */
//   function getDetails () {
//     const token = JSON.parse(localStorage.getItem('currentUser'))
//     console.log(token)
//     const bookingDetails = {
//       excursion,
//       userid: JSON.parse(localStorage.getItem('currentUser')).data._id,
//       thedate,
//       totalamount,
//       token
//     }

//     console.log(bookingDetails)
//     setBookingDetails(bookingDetails)
//   }

//   // const redirectToPaymentsPage = () => {
//   //   //Redirect to the payments page
//   //   window.location.href = '/payment-options'
//   // }
//   const currentUser = JSON.parse(localStorage.getItem('currentUser'))
//   return (
//     <div className='m-5 ' data-aos='flip-down'>
//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <Error />
//       ) : (
//         <div>
//           <style>
//             {`
//         html,
//           body{
//             background-image : url('/images/punta_cana_beach.png');
//             background-size: cover;
//             background-attachment: fixed;

//           }
//         `}
//           </style>
//           <div
//             className='row justify-content-center mt-5 bs'
//             style={{ backgroundColor: '#A8A390 ', borderRadius: '10px' }}
//           >
//             <div className='col-md-6'>
//               <h1>{excursion.data.name}</h1>
//               <img src={excursion.data.imageurls[0]} className='d-block  bigimg' />
//             </div>

//             <div className='col-md-6'>
//               <div style={{ textAlign: 'right' }}>
//                 <h1>Booking Details</h1>
//                 <hr />
//                 <b>
//                   <p>
//                     Name : {currentUser.data.name}
//                   </p>
//                   <p>Date : {match.params.thedate}</p>
//                   {/* <p>Time : </p> */}
//                 </b>
//               </div>

//               <div style={{ textAlign: 'right' }}>
//                 <h1>Amount</h1>
//                 <hr />
//                 <b>
//                   {excursion.data.type !== 'Private' ? (
//                     <>
//                       <p>Price Per Person: ${excursion.data.price}.00 </p>
//                       <p>Total Amount : ${totalamount}.00 </p>
//                       <p>
//                         Ticket(s):{' '}
//                         <input
//                           type='number'
//                           value={numberOfTickets}
//                           min={1}
//                           max={50}
//                           onChange={handleNumberOfTicketsChange}
//                         />
//                       </p>
//                     </>
//                   ) : (
//                     <p>Price: ${excursion.data.price}.00 </p>
//                   )}
//                 </b>
//               </div>

//               <div style={{ float: 'right' }}>
//                 {/* <button
//                   className='btn btn-primary m-2'
//                   onClick={() => {
//                     // Redirect to the Google Form's URL
//                     window.location.href = `https://docs.google.com/forms/d/e/1FAIpQLSdbv40Y9h0_mP3XWOsYchSWGaTZMUfSmk6GjBxe79joIq4w2g/viewform?usp=pp_url&entry.1186382749=${currentUser.data.name}&entry.1281520525=${currentUser.data.number}&entry.219322626=${currentUser.data.email}&entry.1372911005=${excursion.data.name}&entry.312190220=${thedate}&entry.407071960=${numberOfTickets}&entry.729351709=$${totalamount}.00`
//                   }}
//                 >
//                   Book
//                 </button> */}
//               </div>
//             </div>
//             <PaymentScreen bookingDetails={bookingDetails} getDetails={getDetails} />
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default BookingScreen
