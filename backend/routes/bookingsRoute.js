const express = require('express')
const router = express.Router()
const Booking = require('../models/booking')
const Excursion = require('../models/excursion')
const moment = require('moment')
const { v4: uuidv4 } = require('uuid')


router.post('/bookexcursion', async (req, res) => {
  const { excursion, userid, thedate, totalamount, token } = req.body

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    })

    const payment = await stripe.charges.create(
      {
        amount: totalamount * 100,
        customer: customer.id,
        currency: 'usd',
        receipt_email: token.email
      },
      {
        idempotencyKey: uuidv4()
      }
    )

    if (payment) {
  
        const newbooking = new Booking({
          excursion: excursion.name,
          excursionid: excursion._id,
          userid,
          thedate: moment(thedate).format('MM-DD-YYYY'),
          totalamount,
          transactionId: '1234'
        })

        const booking = await newbooking.save()

        const excursiontemp = await Excursion.findOne({ _id: excursion._id })

        excursiontemp.currentbookings.push({
          bookingid: booking._id,
          thedate: moment(thedate).format('MM-DD-YYYY'),
          userid: userid,
          status: booking.status
        })

        await excursiontemp.save()

 
    }

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
