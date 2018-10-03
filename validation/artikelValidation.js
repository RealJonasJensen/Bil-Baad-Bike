const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = validateArtikelInput = (data) => {
    // console.log(data)
    let errors = {};

    data.tekst = !isEmpty(data.tekst) ? data.tekst : "";
    data.overskrift = !isEmpty(data.overskrift) ? data.overskrift : "";
    data.kategori = !isEmpty(data.kategori) ? data.kategori : "";

    if (Validator.isEmpty(data.tekst)) {
        errors.tekst = "Tekst kan ikke være tom"
    }
    if (Validator.isEmpty(data.overskrift)) {
        errors.overskrift = "Overskrift kan ikke være tom"
    }
    if (Validator.isEmpty(data.kategori)) {
        errors.kategori = "Kategori kan ikke være tom"
    }

    return { errors, isValid: isEmpty(errors) }

}