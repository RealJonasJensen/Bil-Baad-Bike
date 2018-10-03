// Modules
const express = require("express")
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");

// Validation
const validateRegisterInput = require("../validation/registerValidation");
const validateLoginInput = require("../validation/loginValidation");

// @route    POST api/brugere/register
// @desc     Register User
// @access   Private
router.post("/register", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors)
    }
    await createUser();
    function createUser() {
        const newBruger = new Bruger({
            navn: req.body.navn,
            password: req.body.password,
            email: req.body.email,
            type: req.body.type,
            redaktion: req.body.redaktion,
            billede: req.body.billede,
            tekst: req.body.tekst
        });

        // Hash password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newBruger.password, salt, (err, hash) => {
                if (err) console.log(err);
                newBruger.password = hash;
                newBruger
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
            })
        })
    }
})

// @route    POST api/brugere/login
// @desc     Login User / Get JwToken
// @access   Public
router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    //Check Validation
    if (!isValid) {
        // console.log(errors)
        return res.status(400).json(errors)
    }

    const email = req.body.email;
    const password = req.body.password;

    //Find User
    Bruger.findOne({ email })
        .then(bruger => {
            if (!bruger) {
                errors.loginEmail = "Bruger ikke fundet";
                return res.status(404).json(errors);
            }

            bcrypt.compare(password, bruger.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = { id: bruger.id }
                        // Sign Token
                        jwt.sign(
                            payload,
                            keys.secretKey,
                            { expiresIn: 3600 },
                            (err, token) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    //console.log(bruger)
                                    res.json({
                                        success: true,
                                        token: "Bearer " + token,
                                        type: bruger.type,
                                        redaktion: bruger.redaktion,
                                        navn: bruger.navn,
                                        id: bruger._id
                                    })
                                }
                            }
                        );
                    } else {
                        errors.loginPassword = "Password er forkert";
                        return res.status(400).json(errors)
                    }
                })
        })
})

// @route    GET api/brugere/redaktion
// @desc     Get redaktionen
// @access   Public
router.get("/redaktionen", (req, res) => {
    Bruger.find({ type: "redaktoer" }, { navn: 1, billede: 1, tekst: 1, email: 1, redaktion: 1 })
        .then(brugere => res.json(brugere))
        .catch(err => res.status(404).json({ error: "Ingen redaktion fundet" }))
})

module.exports = router;