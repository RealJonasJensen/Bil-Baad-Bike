const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
    artikel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artikel",
    },
    artikelNavn: {
        type: String,
        required: true,
    },
    bruger: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bruger",
    },
    brugerNavn: {
        type: String,
        required: true
    },
    tekst: {
        type: String,
        required: true
    },
    oprettet: {
        type: Date,
        default: Date.now
    }
})

module.exports = Log = mongoose.model("Log", logSchema)