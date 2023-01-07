import React, { useState, useEffect } from 'react'
// import Calendar from 'react-calendar';
import { Calendar, Badge, List } from 'antd';
import axios from 'axios';
import moment from 'moment'

function ExcursionsCalendar() {
    const [bookings, setbookings] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()
  
    // useEffect(
    //   () =>
    //     async function fetchData () {
    //       try {
    //         setloading(true)
    //         const data = await (await axios.get('/api/bookings/getallbookings'))
    //           .data
    //         setbookings(data)
    //         setloading(false)
    //       } catch (error) {
    //         console.log(error)
    //         setloading(false)
    //         seterror(true)
    //       }
    //     },
    //   []
    // )

    // return (

    //   <Calendar/>

     
    // )
    useEffect(() => {
      async function fetchData() {
        try {
          // const data = await (await axios.get('/api/bookings/getallbookings')).data;
          // setbookings(data);
          const response = await axios.get('/api/bookings/getallbookings');
          console.log('API response:', response);
          const data = response.data;
          setbookings(data);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }, []);
  
    const dateCellRender = (value) => {

      const dateString = moment(value).format('MM-DD-YYYY');
      const bookingsForDate = bookings.filter((booking) => booking.thedate === dateString);
  

      
      // Remove cancelled bookings from the list
      const filteredBookings = bookingsForDate.filter((booking) => booking.status !== 'cancelled');
      // collect cancelled bookings
      const cancelledBookings = bookingsForDate.filter((booking) => booking.status === 'cancelled');

      // if no bookings on this date
      if (bookingsForDate.length === 0 || cancelledBookings.length > 0){
        return null;
      }
  
      
      //console.log('Bookings for date:', bookingsForDate);
      
      return (
        <List
      size="default"
      dataSource={filteredBookings}
      renderItem={(item) => (
        <List.Item>
          <Badge color="blue" />
          {item.excursion}
        </List.Item>
      )}
    />
      );

    };

    return <Calendar dateCellRender={dateCellRender} />;

  }

export default ExcursionsCalendar


