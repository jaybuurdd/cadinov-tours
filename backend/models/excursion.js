const mongoose = require('mongoose');

const excursionSchema = mongoose.Schema({

    name: {
        type: String, 
        required: true
    },
    maxcount: {
        type: Number,
        required: false
    },
    duration: {
        type: Number,
        required: false
    },
    price : {
        type: Number,
        required: true
    },
    imageurls: [],
    currentbookings: [],
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    availability:[],
    size: {
        type: Number,
        required: false
    },
    maxpeople: {
        type: Number,
        required: false
    },
    
});

const excursionModel = mongoose.model('excursions', excursionSchema);

module.exports = excursionModel;