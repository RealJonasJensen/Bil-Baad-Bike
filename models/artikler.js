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
    forfatter: {
        type: String,
        required: true,
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
            tekst: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            kategori: {
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