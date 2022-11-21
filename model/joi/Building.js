const Joi = require('joi');
const errMessages = require("./validationErrors");
const buldingSchema = Joi.object({
    mieszkanieId: Joi.number()
        .optional()
        .allow(""),
    ulica: Joi.string()
        .min(2)
        .max(20)
        .required()
        .error(errMessages),
    numerBudynku: Joi.string()
        .min(1)
        .max(20)
        .required()
        .regex(/^[0-9]{1,3}[0-9]*[a-zA-Z]*$/)
        .error(errMessages),
    numerMieszkania: Joi.number()
        .min(1)
        .max(999)
        .allow(null)
        .error(errMessages),
    stanDeweloperski: Joi.string()
        .regex(/^(true)$|^(false)$/)
        .error(errMessages)

})
module.exports = buldingSchema