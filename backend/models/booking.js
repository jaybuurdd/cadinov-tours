const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    excursion:{type:String, required:true},
    excursionid:{type:String, required:true},
    userid:{type:String , required:true},
    thedate:{type:String, required:true},
    totalamount:{type:Number, required:true},
    transactionId:{type:String, required:true},
    status:{type:String, required:true , default:'booked'},
},{
    timestamps:true,
}) 

const bookingModel=mongoose.model('bookings' , bookingSchema)

module.exports = bookingModel
