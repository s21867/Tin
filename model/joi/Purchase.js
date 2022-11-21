const Joi = require('joi');
const errMessages = require("./validationErrors");
const purchaseSchema = Joi.object({
    purchaseId: Joi.number()
        .optional()
        .allow(""),
    flat: Joi.number()
        .required()
        .error(errMessages),
    client: Joi.number()
        .required()
        .error(errMessages),
    DataKupna: Joi.date()
        .required()
        .max("now")
        .error(errMessages),
    CenaKupna: Joi.number()
        .min(0)
        .max(20000000)
        .required()
        .error(errMessages)


})

module.exports = purchaseSchema