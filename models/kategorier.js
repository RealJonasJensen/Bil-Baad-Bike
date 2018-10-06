const mongoose = require("mongoose");

const kategoriSchema = new mongoose.Schema({
    kategorier: {
        type: Array,
        required: true
    },
    oprettet: {
        type: Date,
        default: Date.now
    }
})

module.exports = Kategori = mongoose.model("Kategori", kategoriSchema)