const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = validatePrisInput = (data) => {
    let errors = {};

    data.billede = !isEmpty(data.billede) ? data.billede : "";
    data.kategori = !isEmpty(data.kategori) ? data.kategori : "";

    if (Validator.isEmpty(data.billede)) {
        errors.billede = "Billede kan ikke være tom";
    }
    if (Validator.isEmpty(data.kategori)) {
        errors.kategori = "Kategori kan ikke være tom";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}