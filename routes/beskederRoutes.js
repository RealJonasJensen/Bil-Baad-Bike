// Modules
const express = require("express");
const router = express.Router();
const passport = require("passport");

// Models
const Besked = require("../models/beskeder");

// Input Validation
const validateBeskedInput = require("../validation/beskedValidation");

// @route    GET api/beskeder
// @desc     Get messages
// @access   Public
router.get("/", (req, res) => {
    Besked.find({})
        .then(beskeder => res.json(beskeder))
        .catch(err => console.log(err))
})


// @route    POST api/beskeder
// @desc     Create message
// @access   Public
router.post("/", (req, res) => {
    console.log(req.body);
    const { errors, isValid } = validateBeskedInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors)
    }

    const nyBesked = new Besked({
        besked: req.body.besked,
        navn: req.body.navn,
        email: req.body.email,
        emne: req.body.emne
    })

    nyBesked.save()
        .then(besked => res.json(besked))
        .catch(err => console.log(err))
})

// @route    DELETE api/beskeder/:id
// @desc     Delete message
// @access   Private
router.delete("/:id", (req, res) => {
    Besked.findByIdAndRemove(req.params.id)
        .then(artikel => {
            artikel.remove().then(() => res.json({ success: true }))
        })
        .catch(err => res.status(404).json({ artikelNotFound: "Ingen besked med det id" }))
})


module.exports = router;