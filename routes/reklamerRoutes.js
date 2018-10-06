// Modules
const express = require("express")
const router = express.Router();
const multer = require("multer");
const sharp = require("sharp");


// Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // console.log(file)
        cb(null, "./client/src/assets/reklamer");
    },
    filename: (req, file, cb) => {
        // console.log(req)
        // console.log(file)
        cb(null, new Date().toISOString() + file.originalname)
    },

    max: true
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype == "image/jpg") {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5mb
    }
});

// Models
const Reklame = require("../models/reklamer");

// Validation
const validatePriserInput = require("../validation/priserValidation");
const validateSponsorInput = require("../validation/sponsorValidation");

// @route    GET api/reklamer
// @desc     Get reklamer
// @access   Public
router.get("/", (req, res) => {
    Reklame.find({})
        .then(reklamer => {
            res.json(reklamer)
        })
        .catch(err => res.status(404).json({ error: "Intet blev fundet" }))
})

// @route    GET api/reklamer/5
// @desc     Get 5 random
// @access   Public
router.get("/5", (req, res) => {
    Reklame.aggregate([
        { $sample: { size: 5 } }
    ])
        .then(reklamer => res.json(reklamer))
        .catch(err => console.log(err))

})

// @route    POST api/reklamer
// @desc     New reklame
// @access   Public
router.post("/", upload.single("billede"), (req, res) => {
    console.log(req.body)
    console.log(req.file)
    const filNavn = new Date().toISOString() + req.file.originalname;
    const { errors, isValid } = validateSponsorInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors)
    }
    // Resize
    sharp(req.file.path).resize({ width: 128 })
        .toFile(req.file.destination + "/" + filNavn, (err, info) => {
            if (err) console.log(err)
            //console.log(info)
            const nyReklame = new Reklame({
                billede: filNavn,
                kategori: req.body.kategori
            })
            nyReklame.save()
                .then(reklame => res.json(reklame))
                .catch(err => console.log(err))
        })
})

// @route    GET api/reklamer/:id
// @desc     Get reklame by type
// @access   Public
router.get("/:id", (req, res) => {
    Reklame.aggregate([
        { $match: { kategori: req.params.id } },
        { $sample: { size: 5 } }
    ])
        .then(reklamer => res.json(reklamer))
        .catch(err => console.log(err))
})

// @route    DELETE api/reklamer/:id
// @desc     Delete reklame by id
// @access   Private
router.delete("/:id", (req, res) => {
    Reklame.findByIdAndRemove(req.params.id)
        .then(reklamer => res.json(reklamer))
        .catch(err => console.log(err))
})




module.exports = router;