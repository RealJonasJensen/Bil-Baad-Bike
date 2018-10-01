const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = validateLoginInput = (data) => {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";


    if (Validator.isEmpty(data.email)) {
        errors.loginEmail = "Email kan ikke være tom";
    }

    if (Validator.isEmpty(data.password)) {
        errors.loginPassword = "Password kan ikke være tom";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}