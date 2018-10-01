const mongoose = require("mongoose");

const nyhedsbrevSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    oprettet: {
        type: Date,
        default: Date.now
    }

})

module.exports = Nyhedsbrev = mongoose.model("Nyhedsbrev", nyhedsbrevSchema)