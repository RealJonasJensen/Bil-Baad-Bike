const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = validatePrisInput = (data) => {
    let errors = {};

    data.billede = !isEmpty(data.billede) ? data.billede : "";

    if (Validator.isEmpty(data.kategori)) {
        errors.kategori = "Kategori kan ikke være tom";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}