const Joi = require('joi');
const errMessages = require("./validationErrors");
const clientSchema = Joi.object({
    klientId: Joi.number()
        .optional()
        .allow(""),
    imie: Joi.string()
        .min(2)
        .max(20)
        .required()
        .error(errMessages),
    nazwisko: Joi.string()
        .min(2)
        .max(20)
        .required()
        .error(errMessages),
    email: Joi.string()
        .email()
        .min(2)
        .max(50)
        .required()
        .error(errMessages),
    numerTelefonu: Joi.string()
        .min(9)
        .max(12)
        .required()
        .regex(/\+?^[0-9]+$/)
        .error(errMessages),
    password: Joi.string()
        .min(2)
        .max(20)
        .required()
        .error(errMessages)

})

module.exports = clientSchema