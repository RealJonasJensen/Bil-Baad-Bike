const mongoose = require("mongoose");

const kontaktSchema = new mongoose.Schema({
    telefon: {
        type: String,
        required: true,
    },
    fax: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    navn: {
        type: String,
        required: true
    },
    adresse: {
        type: String,
        required: true
    },
    postkode: {
        type: String,
        required: true
    },
    land: {
        type: String,
        required: true
    },
    oprettet: {
        type: Date,
        default: Date.now
    }

})

module.exports = Kontakt = mongoose.model("Kontakt", kontaktSchema)