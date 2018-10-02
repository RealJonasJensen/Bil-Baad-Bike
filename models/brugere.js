const mongoose = require("mongoose");

const brugerSchema = new mongoose.Schema({
    navn: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    redaktion: {
        type: Array,
        required: true
    },
    billede: {
        type: String,
        default: "no_image.png"
    },
    tekst: {
        type: String,
        default: "Hej, jeg er helt ny her!"
    },
    oprettet: {
        type: Date,
        default: Date.now
    }

})

module.exports = Bruger = mongoose.model("Bruger", brugerSchema)