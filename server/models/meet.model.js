const mongoose = require('mongoose');

const meetSchema = new mongoose.Schema({
    Title:{
        type: String,
        required: true
    },
    hostName: {
        type: String,
        required: true
    },
    link:{
        type: String,
        required: true
    },
    status:{
        type:Boolean,
        default: false,
    }

})

const Meet = mongoose.model("Meet", meetSchema);
module.exports = Meet;