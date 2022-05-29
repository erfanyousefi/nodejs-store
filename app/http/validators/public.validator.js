
const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");
const { MongoIDPattern } = require("../../utils/constans");
const ObjectIdValidator = Joi.object({
    id : Joi.string().pattern(MongoIDPattern).error(new Error(new createHttpError.BadRequest("شناسه وارد شده صحیح نمیباشد")))
})
module.exports = {
    ObjectIdValidator
}