const mongoose = require("mongoose");

const priserSchema = new mongoose.Schema({
    visninger: {
        type: Number,
        required: true
    },
    pris: {
        type: Number,
        required: true
    },
    oprettet: {
        type: Date,
        default: Date.now
    }

})

module.exports = Priser = mongoose.model("Priser", priserSchema)