require('dotenv').config()
 const mongoose = require("mongoose");


// mongoose.connect(process.env.DB_URI, {useUnifiedTopology : true, useNewUrlParser : true });

// let connection = mongoose.connection;

// connection.on('error', ()=> {
//     console.log('MongoDB Connection Failed! ❌')
// });

// connection.on('connected', ()=>{
//     console.log('MongoDB Connection Successful ✔️')
// });

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log(`MongoDB Connection Successful ✔️  ${conn.connection.host}`)
    } catch (err) {
        console.error(err);
        console.log('MongoDB Connection Failed! ❌')

    }
}

module.exports = connectDB