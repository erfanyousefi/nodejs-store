const { CourseModel } = require("../../../../models/course");
const Controller = require("../../controller");
const {StatusCodes: HttpStatus} = require("http-status-codes");
const createHttpError = require("http-errors");
const { default: mongoose } = require("mongoose");
const { DiscountModel } = require("../../../../models/discount");
const { discountSchema } = require("../../../validators/admin/discount.schema");
class DiscountController extends Controller{
    async findCourseById(id){
        if(!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("شناسه ارسال شده صحیح نمیباشد")
        const course = await CourseModel.findById(id);
        if(!course) throw createHttpError.NotFound("دوره ای یافت نشد");
        return course
    }
    async findDiscountById(id){
        if(!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("شناسه ارسال شده صحیح نمیباشد")
        const discount = await DiscountModel.findById(id);
        if(!discount) throw createHttpError.NotFound("کد تخفیف یافت نشد");
        return discount
    }
    async removeDiscountById(req, res, next){
        try {
            const {id} = req.params;
            await this.findDiscountById(id)
            const deleteResult = await DiscountModel.deleteOne({_id: id});
            if(deleteResult.deletedCount > 0) {
                return res.status(HttpStatus.OK).json({
                    statusCode: HttpStatus.OK,
                    data: {
                        message: "حذف تخفیف با موفقیت انجام شد"
                    }
                })
            }
            throw createHttpError.BadRequest("حذف انجام نشد مجددا سعی کنید")
        } catch (error) {
            next(error)
        }
    }
    async listOfDiscounts(req, res, next){
        try {
            const discounts = await DiscountModel.find({}).populate({path: "course", select: {title: 1, image: 1}})
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    discounts
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async saveDiscount(req, res, next) {
        try {
            let {code, courseID, value} = await discountSchema.validateAsync(req.body);
            const course = await this.findCourseById(courseID)
                const result = await DiscountModel.create({code, course: courseID, value});
                if(result){
                    return res.status(HttpStatus.CREATED).json({
                        statusCode: HttpStatus.CREATED,
                        data: {
                            message: 'کد تخفیف با موفقیت ایجاد شد'
                        }
                    })
                }
                throw createHttpError.BadRequest("کد تخفیف ایجاد نشد مجددا تلاش کنید")
        } catch (error) {
            next(error)
        }
    }
}
module.exports = {
    DiscountController : new DiscountController()
}