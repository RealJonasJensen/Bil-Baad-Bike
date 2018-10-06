// Modules
const express = require("express");
const router = express.Router();
const passport = require("passport");
const nodemailer = require("nodemailer");

// Models
const Besked = require("../models/beskeder");
const Kontakt = require("../models/kontakt");

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
    //console.log(req.body);
    const { errors, isValid } = validateBeskedInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors)
    }

    Kontakt.find({ _id: "5bb1ff0fc3295f28fc276404" })
        .then(kontakt => {
            //console.log(kontakt)
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: kontakt[0].email,
                    pass: 'biler123'
                }
            });

            var mailOptions = {
                from: kontakt[0].email,
                to: kontakt[0].email,
                subject: req.body.emne,
                html: `
            <h2>${req.body.emne}</h2>
            <p>${req.body.besked}</p>
            <hr>
            <p>From: </p>
            <p>${req.body.navn}</p>
            <p>${req.body.email}</p>
            `
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    res.status(200).json({ success: true })
                    // console.log('Email sent: ' + info.response);
                }
            });
        })
        .catch(err => res.status(404).json({ error: "Intet blev fundet" }))

    // const nyBesked = new Besked({
    //     besked: req.body.besked,
    //     navn: req.body.navn,
    //     email: req.body.email,
    //     emne: req.body.emne
    // })

    // nyBesked.save()
    //     .then(besked => res.json(besked))
    //     .catch(err => console.log(err))

})

// @route    DELETE api/beskeder/:id
// @desc     Delete message
// @access   Private
router.delete("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Besked.findByIdAndRemove(req.params.id)
        .then(artikel => {
            artikel.remove().then(() => res.json({ success: true }))
        })
        .catch(err => res.status(404).json({ artikelNotFound: "Ingen besked med det id" }))
})


module.exports = router;