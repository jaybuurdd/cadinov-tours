const express = require("express");
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

dotenv.config();

const corsOptions = require('./config/corsOptions');

const excursionsRoute = require('./routes/excursionsRoute');
const usersRoute = require('./routes/usersRoute');
const bookingsRoute = require('./routes/bookingsRoute');

app.use(cors(corsOptions));
app.use(express.json());



mongoose.connect(process.env.DB_URI, {useUnifiedTopology : true, useNewUrlParser : true });

let connection = mongoose.connection;

connection.on('error', ()=> {
    console.log('MongoDB Connection Failed! ❌')
});

connection.on('connected', ()=>{
    console.log(`MongoDB Connection Successful on Cluster -- ${connection.host} ✔️`)
});

app.use('/api/excursions', excursionsRoute);
app.use('/api/users', usersRoute);
app.use('/api/bookings', bookingsRoute);

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;
