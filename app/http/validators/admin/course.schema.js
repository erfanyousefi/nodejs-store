const Joi = require("@hapi/joi");
const createError = require("http-errors");
const { MongoIDPattern } = require("../../../utils/constans");
const createCourseSchema = Joi.object({
    title : Joi.string().min(3).max(30).error(createError.BadRequest("عنوان دوره صحیح نمیباشد")),
    text: Joi.string().error(createError.BadRequest("متن ارسال شده صحیح نمیباشد")),
    short_text: Joi.string().error(createError.BadRequest("متن ارسال شده صحیح نمیباشد")),
    tags: Joi.array().min(0).max(20).error(createError.BadRequest("برچسب ها نمیتواند بیشتر از 20 ایتم باشد")),
    category: Joi.string().regex(MongoIDPattern).error(createError.BadRequest("دسته بندی مورد نظر یافت نشد")),
    price: Joi.number().error(createError.BadRequest("قیمت وارد شده صحیح نمیباشد")),
    discount: Joi.number().error(createError.BadRequest("تخفیف وارد شده صحیح نمیباشد")),
    type: Joi.string().regex(/(free|cash|special)/i),
    filename: Joi.string().regex(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createError.BadRequest("تصویر ارسال شده صحیح نمیباشد")),
    fileUploadPath : Joi.allow()
});
const createEpisodeSchema = Joi.object({
    title : Joi.string().min(3).max(30).error(createError.BadRequest("عنوان دوره صحیح نمیباشد")),
    text: Joi.string().error(createError.BadRequest("متن ارسال شده صحیح نمیباشد")),
    type: Joi.string().regex(/(lock|unlock)/i),
    time: Joi.string().regex(/[0-9]{2}\:[0-9]{2}\:[0-9]{2}/i), //00:06:32
    chapterID: Joi.string().regex(MongoIDPattern).error(createError.BadRequest("شناسه ی فصل صحیح نمیباشد")),
    courseID: Joi.string().regex(MongoIDPattern).error(createError.BadRequest("شناسه ی دوره صحیح نمیباشد")),
});

module.exports = {
    createCourseSchema,
    createEpisodeSchema
}