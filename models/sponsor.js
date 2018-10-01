const mongoose = require("mongoose");

const sponsorSchema = new mongoose.Schema({
    tekst: {
        type: String,
        required: true
    },
    priser: [
        {
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
        }
    ],
    sponsorer: [
        {
            billede: {
                type: String,
                required: true,
            },
            kategori: {
                type: String,
                required: true,
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

module.exports = Sponsor = mongoose.model("Sponsor", sponsorSchema)