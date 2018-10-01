// Modules
const express = require("express")
const router = express.Router();

// Models
const Nyhedsbrev = require("../models/nyhedsbrev");

// Validation
const validateNyhedsbrevInput = require("../validation/nyhedsbrevValidation");

router.post("/", (req, res) => {
    const { errors, isValid } = validateNyhedsbrevInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors)
    }

    const newNyhedsbrev = new Nyhedsbrev({
        email: req.body.email
    })
    newNyhedsbrev.save()
        .then(nyhedsbrev => res.json(nyhedsbrev))
        .catch(err => console.log(err))

})

router.delete("/", (req, res) => {
    const { errors, isValid } = validateNyhedsbrevInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors)
    }
    //console.log(req.body)
    Nyhedsbrev.findOne({ email: req.body.email })
        .then(nyhedsbrev => {
            nyhedsbrev.remove().then(() => res.json({ success: true }))
        })
        .catch(err => res.status(404).json({ emailNotFound: "Denne mail abonnerer ikke" }))
})

module.exports = router;