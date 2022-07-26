const createHttpError = require("http-errors");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const { UserModel } = require("../../../../models/users");
const { deleteInvalidPropertyInObject, getBasketOfUser } = require("../../../../utils/functions");
const Controller = require("../../controller");
class UserController extends Controller{
    async getAllUsers(req, res, next){
        try {
            const {search} = req.query;
            const databaseQuery = {};
            if(search) databaseQuery['$text'] = {$search : search}
            console.log(search);
            console.log(databaseQuery);
            const users = await UserModel.find(databaseQuery);
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data : {
                    users
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async updateUserProfile(req, res, next){
        try {
            const userID = req.user._id;
            const data = req.body;
            const BlackListFields = ["mobile", "otp", "bills", "discount", "Roles", "Courses"]
            deleteInvalidPropertyInObject(data, BlackListFields)
            const profileUpdateResult = await UserModel.updateOne({_id: userID}, { $set: data })
            if(!profileUpdateResult.modifiedCount) throw new createHttpError.InternalServerError("به روزسانی انجام نشد")
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "به روزرسانی پروفایل با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async userProfile(req, res, next){
        try {
            const user = req.user;
            //bill, courses, discount, 
            const basket = (await getBasketOfUser(user._id))?.[0]
            console.log(await getBasketOfUser(user._id));
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    user,
                    basket
                }
            })
        } catch (error) {
            next(error)
        }
    }
}
module.exports = {
    UserController : new UserController(),
}