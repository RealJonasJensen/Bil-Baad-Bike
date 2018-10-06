const mongoose = require("mongoose");

const artiklerSchema = new mongoose.Schema({
    tekst: {
        type: String,
        required: true
    },
    overskrift: {
        type: String,
        required: true
    },
    forfatterNavn: {
        type: String,
        required: true
    },
    forfatter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bruger",
    },
    klik: {
        type: Number,
        default: 0,
    },
    kategori: {
        type: String,
        required: true
    },
    kommentarer: [
        {
            navn: {
                type: String,
                required: true
            },
            kommentar: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            oprettet: {
                type: Date,
                default: Date.now
            }
        }
    ],
    oprettet: {
        type: Date,
        default: Date.now
    }

})

module.exports = Artikel = mongoose.model("Artikel", artiklerSchema)