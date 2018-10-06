// Modules
const express = require("express")
const router = express.Router();
const passport = require("passport");

// Models
const Sponsor = require("../models/sponsor");

// Validation
const validatePriserInput = require("../validation/priserValidation");
const validateSponsorInput = require("../validation/sponsorValidation");

// @route    GET api/sponsor
// @desc     Get sponsorprices
// @access   Public
router.get("/", (req, res) => {
    Sponsor.find({})
        .then(sponsor => {
            res.json(sponsor)
        }
        )
        .catch(err => res.status(404).json({ error: "Intet blev fundet" }))
})

router.put("/", (req, res) => {
    Sponsor.findByIdAndUpdate("5bb1f8cb5ad48f261a8c8dda", req.body)
        .then(sponsor => res.json(sponsor))
        .catch(err => res.status(404).json({ error: "Intet blev fundet" }))
})

// @route    GET api/sponsor/kategori/:id
// @desc     Get sponsor by type
// @access   Public
router.get("/kategori/:id", (req, res) => {
    Sponsor.find({})
        .then(sponsor => {
            //console.log(sponsor[0].sponsorer)
            const kategori = sponsor[0].sponsorer.filter((item => item.kategori === req.params.id))
            res.json(kategori)
        })
        .catch(err => console.log(err))
})

// @route    POST api/sponsor/sponsor
// @desc     Create new sponsor
// @access   Private
router.post("/sponsor", passport.authenticate("jwt", { session: false }), (req, res) => {
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

// @route    POST api/sponsor/priser
// @desc     Create new price
// @access   Private
router.post("/priser", passport.authenticate("jwt", { session: false }), (req, res) => {

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

// @route    GET api/sponsor/priser/:id
// @desc     Get sponsor by id
// @access   Public
router.get("/priser/:id", (req, res) => {
    Sponsor.findById("5bb1f8cb5ad48f261a8c8dda")
        .then(sponsor => {
            //console.log(sponsor.priser)
            const pris = sponsor.priser.filter(pris => pris._id == req.params.id);
            res.json(pris);
        })
        .catch(err => res.status(404).json({ error: "Intet blev fundet" }))
})

// @route    DELETE api/sponsor/priser/:id
// @desc     DELETE sponsor by id
// @access   Private
router.delete("/priser/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Sponsor.findById("5bb1f8cb5ad48f261a8c8dda")
        .then(sponsor => {
            const priser = sponsor.priser.filter(pris => pris._id != req.params.id);
            sponsor.priser = priser;
            sponsor.save().then(sponsor => res.json(sponsor));
            // console.log(priser)
        })
        .catch(err => res.status(404).json({ error: "Intet blev fundet" }))
})

// @route    PUT api/sponsor/priser/:id
// @desc     Update sponsor by id
// @access   Private
router.put("/priser/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Sponsor.findById("5bb1f8cb5ad48f261a8c8dda")
        .then(sponsor => {
            //console.log(sponsor.priser)
            const pris = sponsor.priser.filter(pris => pris._id == req.params.id);
            pris[0].visninger = req.body.visninger;
            pris[0].pris = req.body.pris;
            sponsor.save().then(sponsor => res.json(sponsor));
        })
        .catch(err => res.status(404).json({ error: "Intet blev fundet" }))
})
module.exports = router;