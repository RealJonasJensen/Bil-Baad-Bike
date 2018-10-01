const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = validatePrisInput = (data) => {
    let errors = {};

    data.visninger = !isEmpty(data.visninger) ? data.visninger : "";
    data.pris = !isEmpty(data.pris) ? data.pris : "";

    if (Validator.isEmpty(data.visninger)) {
        errors.visninger = "Visninger kan ikke være tom";
    }
    if (Validator.isEmpty(data.pris)) {
        errors.pris = "Pris kan ikke være tom";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}