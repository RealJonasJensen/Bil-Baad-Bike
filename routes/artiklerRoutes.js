// Modules
const express = require("express");
const router = express.Router();
const passport = require("passport");

// Models
const Artikel = require("../models/artikler");

// Input Validation
const validateArtikelInput = require("../validation/artikelValidation");

// @route   GET api/artikler
// @desc    Get all articles
// @access  Public
router.get("/", (req, res) => {
    Artikel.find({})
        .then(artikler => res.json(artikler))
        .catch(err => res.status(404).json({ error: "Ingen artikler blev fundet" }))
})

// @route   GET api/artikler/nylige
// @desc    Get 6 recent
// @access  Public
router.get("/nylige", (req, res) => {
    Artikel.find({}).limit(6)
        .then(artikler => res.json(artikler))
        .catch(err => res.status(404).json({ error: "Ingen artikler blev fundet" }))
})

// @route   GET api/artikler/:id
// @desc    Get article by id
// @access  Public
router.get("/:id", (req, res) => {
    Artikel.findById(req.params.id).populate("forfatter", ["billede", "navn", "type", "tekst"])
        .then(artikel => res.json(artikel))
        .catch(err => res.status(404).json({ error: "Ingen artikel blev fundet" }))
})

// @route   GET api/artikler/kategori/:id
// @desc    Get all articles by kategori
// @access  Public
router.get("/kategori/:id", (req, res) => {
    Artikel.find({ kategori: req.params.id })
        .then(artikler => res.json(artikler))
        .catch(err => res.status(404).json({ error: "Ingen artikler blev fundet" }))
})

// @route   POST api/artikler
// @desc    Create new article
// @access  Private
router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    const { errors, isValid } = validateArtikelInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors)
    }
    const newArticle = new Artikel({
        tekst: req.body.tekst,
        overskrift: req.body.overskrift,
        forfatter: req.body.forfatter,
        kategori: req.body.kategori
    })
    newArticle.save()
        .then(product => res.json(product))
        .catch(err => console.log(err))
})

// @route   DELETE api/artikler/:id
// @desc    Delete article by id
// @access  Private
router.delete("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Artikel.findById(req.params.id)
        .then(artikel => {
            artikel.remove().then(() => res.json({ success: true }))
        })
        .catch(err => res.status(404).json({ artikelNotFound: "Ingen artikel med det id" }))
})

// @route   PUT api/artikler/:id
// @desc    Update article by id
// @access  Private
router.put("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    const { errors, isValid } = validateArtikelInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors)
    }
    Artikel.findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(artikel => {
            res.json(artikel)
        })
        .catch(err => res.status(404).json(err))
})

// @route   PUT api/artikler/klik/:id
// @desc    Update views
// @access  Public
router.put("/klik/:id", (req, res) => {
    Artikel.findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(artikel => {
            res.json(artikel)
        })
        .catch(err => res.status(404).json(err))
})

module.exports = router;