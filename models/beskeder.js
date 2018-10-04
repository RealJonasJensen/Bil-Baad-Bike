const mongoose = require("mongoose");

const beskedSchema = new mongoose.Schema({
    navn: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    emne: {
        type: String,
        required: true
    },
    besked: {
        type: String,
        required: true
    },
    oprettet: {
        type: Date,
        default: Date.now
    }
})

module.exports = Besked = mongoose.model("Besked", beskedSchema)