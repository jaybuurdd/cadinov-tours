
const express = require("express");
const app = express();
const dotenv = require('dotenv')

const dbConfig = require(`./db`);
const mongoose = require('mongoose')


const path = require('path')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')




dotenv.config()
dbConfig()
// app.use(logger('dev'))

// app.use(cors())
app.use(express.json)

const excursionsRoute = require("./routes/excursionsRoute")
const usersRoute = require("./routes/usersRoute")
const bookingsRoute=require('./routes/bookingsRoute')

app.use('api/excursions', excursionsRoute)
app.use('api/users', usersRoute)
app.use('api/bookings' , bookingsRoute)



if(process.env.NODE_ENV === 'production')
{
    app.use('/' , express.static('client/build'))

    app.get('*' , (req , res)=>{

        res.sendFile(path.resolve(__dirname  , 'client/build/index.html'))

    })
}

const port = process.env.PORT || 5000

// mongoose.connection.once('open', () => {
    
//     console.log('Connected to MongoDB')
//     app.listen(port, () => console.log(`Node JS ${process.env.NODE_ENV} Server Started at `+ port) )


// })

// mongoose.connection.on('error', err => {

//     console.log(err)

// })

module.exports = app
