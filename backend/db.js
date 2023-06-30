require('dotenv').config()
 const mongoose = require("mongoose");


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