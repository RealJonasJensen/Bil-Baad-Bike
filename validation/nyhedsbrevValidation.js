const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = validateNyhedsbrevInput = (data) => {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";

    if (!Validator.isEmail(data.email)) {
        errors.email = "Skal være en valid email";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email kan ikke være tom";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }

}