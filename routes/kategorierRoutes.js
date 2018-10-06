// Modules
const express = require("express")
const router = express.Router();

// Models
const Kategori = require("../models/kategorier");

// @route    GET api/kategorier
// @desc     Get kategorier
// @access   Public
router.get("/", (req, res) => {
    Kategori.findOne({ _id: "5bb883abf2b44e75d8335eee" })
        .then(kategori => res.json(kategori))
        .catch(err => {
            res.status(404).json({ notFound: "Intet fundet" })
        })
})


// @route    PUT api/kategorier
// @desc     Update kategorier
// @access   Private
router.put("/", (req, res) => {
    //console.log(req.body)
    Kategori.findByIdAndUpdate("5bb883abf2b44e75d8335eee", passport.authenticate("jwt", { session: false }), req.body)
        .then(kategori => res.json(kategori))
        .catch(err => console.log(err))
})

// @route    POST api/kategorier
// @desc     Create kategorier
// @access   Public
// router.post("/", (req, res) => {
//     const newKategori = new Kategori({
//         kategorier: req.body.kategorier
//     })
//     newKategori.save()
//         .then(kategori => res.json(kategori))
//         .catch(err => console.log(err))
// })


module.exports = router;