// Modules
const express = require("express")
const router = express.Router();

// Models
const Sponsor = require("../models/sponsor");

// Validation
const validatePriserInput = require("../validation/priserValidation");
const validateSponsorInput = require("../validation/sponsorValidation");

router.get("/", (req, res) => {
    Sponsor.find({})
        .then(sponsor => res.json(sponsor))
        .catch(err => res.status(404).json({ error: "Intet blev fundet" }))
})

router.post("/sponsor", (req, res) => {

    const { errors, isValid } = validateSponsorInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors)
    }

    Sponsor.findById("5bb1f8cb5ad48f261a8c8dda")
        .then(sponsor => {
            const newSponsor = {
                billede: req.body.billede,
                kategori: req.body.kategori,
            }
            sponsor.sponsorer.push(newSponsor);
            sponsor.save().then(sponsor => res.json(sponsor))
        })
        .catch(err => res.status(404).json({ error: "Intet blev fundet" }))
})

router.post("/priser", (req, res) => {

    const { errors, isValid } = validatePriserInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors)
    }


    Sponsor.findById("5bb1f8cb5ad48f261a8c8dda")
        .then(sponsor => {
            const newPris = {
                visninger: req.body.visninger,
                pris: req.body.pris
            }
            sponsor.priser.push(newPris);
            sponsor.save().then(sponsor => res.json(sponsor))
        })
        .catch(err => res.status(404).json({ error: "Intet blev fundet" }))
})



module.exports = router;