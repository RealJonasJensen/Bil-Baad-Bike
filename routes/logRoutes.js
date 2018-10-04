// Modules
const express = require("express");
const router = express.Router();
const passport = require("passport");

// Models
const Log = require("../models/logs");

// @route   GET api/logs
// @desc    Get logs 
// @access  Private
router.get("/", (req, res) => {
    Log.find({}).sort({ oprettet: -1 })
        .then(logs => {
            res.json(logs)
        })
        .catch(err => res.status(404).json({ error: "Ingen logs fundet." }))
})

// @route   POST api/logs
// @desc    Create log 
// @access  Private
router.post("/", (req, res) => {
    const nyLog = new Log({
        artikel: req.body.artikelId,
        artikelNavn: req.body.artikelNavn,
        bruger: req.body.brugerId,
        brugerNavn: req.body.brugerNavn,
        tekst: req.body.tekst
    })
    nyLog.save()
        .then(log => res.json(log))
        .catch(err => console.log(err))
})

// @route   DELETE api/logs/:id
// @desc    Delete a log 
// @access  Private
router.delete("/:id", (req, res) => {
    Log.findByIdAndRemove(req.params.id)
        .then(artikel => {
            res.json({ success: true })
        })
        .catch(err => console.log(err))
})

module.exports = router;