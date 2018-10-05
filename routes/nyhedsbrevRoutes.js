// Modules
const express = require("express")
const router = express.Router();

// Models
const Nyhedsbrev = require("../models/nyhedsbrev");

// Validation
const validateNyhedsbrevInput = require("../validation/nyhedsbrevValidation");

// @route    POST api/nyhedsbrev
// @desc     Create new/delete user in nyhedsbrev
// @access   Public
router.post("/", async (req, res) => {
    //console.log(req.body)
    const { errors, isValid } = validateNyhedsbrevInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors)
    }

    await Nyhedsbrev.findOne({ email: req.body.email })
        .then(email => {
            if (email && email.email.toLowerCase() == req.body.email.toLowerCase()) {
                errors.email = "Mail er allerede tilmeldt";
            }
        })

    await nyNyhedsbrev(errors);

    function nyNyhedsbrev(errors) {
        if (errors.email) {
            res.status(400).json(errors)
        } else {
            const newNyhedsbrev = new Nyhedsbrev({
                email: req.body.email
            })
            newNyhedsbrev.save()
                .then(nyhedsbrev => res.json(nyhedsbrev))
                .catch(err => console.log(err))
        }
    }


})

// @route    DELETE api/nyhedsbrev
// @desc     Remove email from nyhedsbrev
// @access   Public
router.post("/slet", (req, res) => {
    console.log(req.body)
    const { errors, isValid } = validateNyhedsbrevInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors)
    }

    //console.log(req.body)
    Nyhedsbrev.findOne({ email: req.body.email })
        .then(nyhedsbrev => {
            if (nyhedsbrev) {
                errors.email = "Mailen er nu afmeldt";
                nyhedsbrev.remove().then(() => res.json(errors))
            } else {
                errors.email = "Mailen er ikke tilmeldt";
                res.status(404).json(errors)
            }
        })
        .catch(err => {
            res.status(404).json({ notFound: "Intet fundet" })
        })
})

module.exports = router;