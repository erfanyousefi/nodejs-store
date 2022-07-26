const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");
const getOtpSchema = Joi.object({
    mobile : Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(createHttpError.BadRequest("شماره موبایل وارد شده صحیح نمیباشد"))
});
const chackOtpSchema = Joi.object({
    mobile : Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(createHttpError.BadRequest("شماره موبایل وارد شده صحیح نمیباشد")),
    code : Joi.string().min(4).max(6).error(createHttpError.BadRequest("کد ارسال شده صحیح نمیباشد"))
})
const registerSchemaSchema = Joi.object({
    mobile : Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(createHttpError.BadRequest("شماره موبایل وارد شده صحیح نمیباشد")),
    first_name : Joi.string().trim().min(3).max(25).error(createHttpError.BadRequest("نام را بطور صحیح وارد کنید")),
    last_name : Joi.string().trim().min(3).max(25).error(createHttpError.BadRequest("نام خانوادگی را بطور صحیح وارد کنید"))
})
module.exports = {
    getOtpSchema,
    chackOtpSchema,
    registerSchemaSchema
}