const express = require('express')
const router = express.Router()
const Booking = require('../models/booking')
const Excursion = require('../models/excursion')
const moment = require('moment')
const { v4: uuidv4 } = require('uuid')


router.post('/bookexcursion', async (req, res) => {
  const { excursion, thedate, totalamount, token } = req.body

  try {
    const transactionId = uuidv4();
    const date = moment(thedate).format('MM-DD-YYYY')

        const newbooking = new Booking({
          excursion: excursion.data.name,
          excursionid: excursion.data._id,
          userid: token.data._id,
          thedate: date,
          totalamount,
          transactionId: transactionId
        })

        // console.log("new booking: ", newbooking)
        const booking = await newbooking.save()

        const excursiontemp = await Excursion.findOne({ _id: excursion.data._id })

        excursiontemp.currentbookings.push({
          bookingid: booking._id,
          thedate: date,
          userid: token._id,
          status: booking.status
        })

        await excursiontemp.save()

    res.send('Payment Successful! Your excursion is booked!')
  } catch (error) {
    return res.status(400).json({ error })
  }
})

router.get('/getallbookings', async (req, res) => {
  try {
    const bookings = await Booking.find()
    res.send(bookings)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

router.post('/getbookingsbyuserid', async (req, res) => {

  const userid = req.body.userid

  try {
    const bookings = await Booking.find({userid : userid})
    res.send(bookings)
  } catch (error) {

    return res.status(400).json({ error })
    
  }

})


router.post("/cancelbooking", async(req,res)=> {

  const {bookingid, excursionid} = req.body

  try {
  
    const bookingItem = await Booking.findOne({_id : bookingid})
    bookingItem.status = "cancelled"
    await bookingItem.save()

    const excrusion = await Excursion.findOne({_id : excursionid})

    const bookings = excrusion.currentbookings

    const tempBookings = bookings.filter(booking => booking.bookingid.toString() != bookingid)
    excrusion.currentbookings = tempBookings
    await excrusion.save()

    res.send("Your Booking Cancelled Sucessfully!")

  } catch (error) {
    
    return res.status(400).json({ error })

  }

})

module.exports = router
