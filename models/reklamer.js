const mongoose = require("mongoose");

const reklamerSchema = new mongoose.Schema({
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
})

module.exports = Reklame = mongoose.model("Reklame", reklamerSchema)