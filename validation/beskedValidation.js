const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = validateBeskedInput = (data) => {
    // console.log(data)
    let errors = {};

    data.besked = !isEmpty(data.besked) ? data.besked : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.emne = !isEmpty(data.emne) ? data.emne : "";
    data.navn = !isEmpty(data.navn) ? data.navn : "";

    if (Validator.isEmpty(data.besked)) {
        errors.besked = "Besked kan ikke være tom"
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email kan ikke være tom"
    }
    if (Validator.isEmpty(data.emne)) {
        errors.emne = "Emne kan ikke være tom"
    }
    if (Validator.isEmpty(data.navn)) {
        errors.navn = "Navn kan ikke være tom"
    }

    return { errors, isValid: isEmpty(errors) }

}