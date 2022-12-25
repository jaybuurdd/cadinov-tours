const express = require("express");

const app = express();
const dbConfig = require(`./db`);
app.use(express.json())
const path = require('path')
const excursionsRoute = require("./routes/excursionsRoute")
const usersRoute = require("./routes/usersRoute")
const bookingsRoute=require('./routes/bookingsRoute')



app.use('/api/excursions', excursionsRoute)
app.use('/api/users', usersRoute)
app.use('/api/bookings' , bookingsRoute)


if(process.env.NODE_ENV ==='production')
{
    app.use('/' , express.static('client/build'))

    app.get('*' , (req , res)=>{

        res.sendFile(path.resolve(__dirname  , 'client/build/index.html'))

    })
}

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Node JS Server Started`))
