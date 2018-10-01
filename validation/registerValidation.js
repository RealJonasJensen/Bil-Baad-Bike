const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = validateRegisterInput = (data) => {
    let errors = {};

    data.navn = !isEmpty(data.navn) ? data.navn : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    data.type = !isEmpty(data.type) ? data.type : "";
    data.billede = !isEmpty(data.billede) ? data.billede : "";
    data.tekst = !isEmpty(data.tekst) ? data.tekst : "";


    if (Validator.isEmpty(data.navn)) {
        errors.navn = "Navn kan ikke være tom"
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = "Skal være en valid email";
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email kan ikke være tom";
    }
    if (Validator.isEmpty(data.type)) {
        errors.type = "Type kan ikke være tom";
    }
    if (Validator.isEmpty(data.billede)) {
        errors.billede = "Billede kan ikke være tom";
    }
    if (Validator.isEmpty(data.tekst)) {
        errors.tekst = "Tekst kan ikke være tom";
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password skal være mellem 6 og 30 tegn";
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password kan ikke være tom";
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Gentag password kan ikke være tom";
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "De skal matche";
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }

}