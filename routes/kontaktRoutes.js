// Modules
const express = require("express")
const router = express.Router();

// Models
const Kontakt = require("../models/kontakt");

// Validation
const validateKontaktInput = require("../validation/kontaktValidation");

// @route    GET api/kontakt
// @desc     Get contact info
// @access   Public
router.get("/", (req, res) => {
    Kontakt.find({ _id: "5bb1ff0fc3295f28fc276404" })
        .then(sponsor => res.json(sponsor))
        .catch(err => res.status(404).json({ error: "Intet blev fundet" }))
})

// @route    PUT api/kontakt
// @desc     Update contact info
// @access   Private
router.put("/", (req, res) => {
    const { errors, isValid } = validateKontaktInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors)
    }
    Kontakt.findOneAndUpdate({ _id: "5bb1ff0fc3295f28fc276404" }, req.body)
        .then(kontakt => res.json(kontakt))
        .catch(err => res.status(404).json(err))
})



module.exports = router;