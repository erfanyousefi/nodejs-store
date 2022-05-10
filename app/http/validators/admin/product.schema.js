const Joi = require("@hapi/joi");
const createError = require("http-errors");
const { MongoIDPattern } = require("../../../utils/constans");
const createProductSchema = Joi.object({
    title : Joi.string().min(3).max(30).error(createError.BadRequest("عنوان دسته بندی صحیح نمیباشد")),
    text: Joi.string().error(createError.BadRequest("متن ارسال شده صحیح نمیباشد")),
    short_text: Joi.string().error(createError.BadRequest("متن ارسال شده صحیح نمیباشد")),
    tags: Joi.array().min(0).max(20).error(createError.BadRequest("برچسب ها نمیتواند بیشتر از 20 ایتم باشد")),
    colors: Joi.array().min(0).max(20).error(createError.BadRequest("رنگ های انتخابی  نمیتواند بیشتر از 20 ایتم باشد")),
    category: Joi.string().regex(MongoIDPattern).error(createError.BadRequest("دسته بندی مورد نظر یافت نشد")),
    price: Joi.number().error(createError.BadRequest("قیمت وارد شده صحیح نمیباشد")),
    discount: Joi.number().error(createError.BadRequest("تخفیف وارد شده صحیح نمیباشد")),
    count: Joi.number().error(createError.BadRequest("تعداد وارد شده صحیح نمیباشد")),
    weight: Joi.number().allow(null, 0, "0").error(createError.BadRequest("وزن وارد شده صحیح نمیباشد")),
    length: Joi.number().allow(null, 0, "0").error(createError.BadRequest("طول وارد شده صحیح نمیباشد")),
    height: Joi.number().allow(null, 0, "0").error(createError.BadRequest("ارتفاع وارد شده صحیح نمیباشد")),
    width: Joi.number().allow(null, 0, "0").error(createError.BadRequest("عرض وارد شده صحیح نمیباشد")),
    type: Joi.string().regex(/(virtual|phisical)/i),
    filename: Joi.string().regex(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createError.BadRequest("تصویر ارسال شده صحیح نمیباشد")),
    fileUploadPath : Joi.allow()
});

module.exports = {
    createProductSchema
}