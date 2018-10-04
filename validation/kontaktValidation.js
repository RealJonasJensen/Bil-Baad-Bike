const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = validateKontaktInput = (data) => {
    let errors = {};

    data.telefon = !isEmpty(data.telefon) ? data.telefon : "";
    data.fax = !isEmpty(data.fax) ? data.fax : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.adresse = !isEmpty(data.adresse) ? data.adresse : "";
    data.postkode = !isEmpty(data.postkode) ? data.postkode : "";
    data.land = !isEmpty(data.land) ? data.land : "";


    if (Validator.isEmpty(data.telefon)) {
        errors.telefon = "Telefon kan ikke være tom";
    }
    if (Validator.isEmpty(data.fax)) {
        errors.fax = "Fax kan ikke være tom";
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email kan ikke være tom";
    }
    if (Validator.isEmpty(data.adresse)) {
        errors.adresse = "Adresse kan ikke være tom";
    }
    if (Validator.isEmpty(data.postkode)) {
        errors.postkode = "Postkode kan ikke være tom";
    }
    if (Validator.isEmpty(data.land)) {
        errors.land = "Land kan ikke være tom";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}