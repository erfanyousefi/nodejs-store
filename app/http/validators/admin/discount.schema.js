const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");
const { MongoIDPattern } = require("../../../utils/constans");

const discountSchema = Joi.object({
    code : Joi.string().min(4).max(10).error(createHttpError.BadRequest("کد ارسال شده صحیح نمیباشد")),
    value : Joi.number().min(0).max(100).error(createHttpError.BadRequest("مقدار وارد شده صحیح نمیباشد")),
    courseID : Joi.string().pattern(MongoIDPattern).error(createHttpError.BadRequest("شناسه دوره ی ارسال شده صحیح نمیباشد"))
})
const discountCodeSchema = Joi.object({
    discountCode : Joi.string().min(4).max(10).allow("").error(createHttpError.BadRequest("کد ارسال شده صحیح نمیباشد")),
})

module.exports = {
    discountSchema,
    discountCodeSchema
}