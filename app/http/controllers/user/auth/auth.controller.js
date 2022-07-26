const { create } = require("@hapi/joi/lib/ref");
const createError = require("http-errors");
const { ROLES } = require("../../../../utils/constans");
const { RandomNumberGenerator, SignAccessToken, VerifyRefreshToken, SignRefreshToken, getBasketOfUser } = require("../../../../utils/functions");
const { getOtpSchema, chackOtpSchema, registerSchemaSchema } = require("../../../validators/user/auth.schema");
const Controller = require("../../controller");
const { UserModel } = require("./../../../../models/users")
const {StatusCodes : HttpStatus} = require("http-status-codes");
const createHttpError = require("http-errors");
class UserAuthController extends Controller {
  async register(req, res, next) {
    try {
      const {mobile, first_name, last_name} = await registerSchemaSchema.validateAsync(req.body);
      const userExistResult = await this.checkExistUser(mobile)
      if(userExistResult) throw createHttpError.Unauthorized("شما قبلا ثبت نام کرده اید در بخش ورود وارد حساب کاربری خود شوید")
      const otp = {
        code: RandomNumberGenerator(),
        expiresIn: (new Date().getTime() + 120000),
      }
      const registerResult = await UserModel.create({
        first_name,
        last_name,
        mobile,
        otp,
        Role: ROLES.USER
      })
      console.log(registerResult);
      return res.status(HttpStatus.CREATED).json({
        data: {
          message : " کد اعتبار سنجی برای شما پیامک گردید",
          code : otp.code
        }
      })
      
    } catch (error) {
      next(error)
    }
  }
  async getOtp(req, res, next) {
    try {
      await getOtpSchema.validateAsync(req.body);
      const { mobile } = req.body;
      const code = RandomNumberGenerator()
      const result = await this.saveUser(mobile, code)
      if (!result) throw createError.Unauthorized("ورود شما انجام نشد")
      return res.status(HttpStatus.OK).send({
        data: {
          statusCode: HttpStatus.OK,
          data: {
            message: "کد اعتبار سنجی با موفقیت برای شما ارسال شد",
            code,
            mobile
          }
        }
      });
    } catch (error) {
      next(error);
    }
  }
  async checkOtp(req, res, next) {
    try {
      await chackOtpSchema.validateAsync(req.body)
      const { mobile, code } = req.body;
      const user = await UserModel.findOne({ mobile }, { password: 0, refreshToken: 0, accessToken: 0, basket: 0 }).populate([{path: "Courses"}])
      if (!user) throw createError.NotFound("کاربر یافت نشد")
      if (user.otp.code != code) throw createError.Unauthorized("کد ارسال شده صحیح نمیباشد");
      const now = (new Date()).getTime();
      if (+user.otp.expiresIn < now) throw createError.Unauthorized("کد شما منقضی شده است");
      const accessToken = await SignAccessToken(user._id)
      const refreshToken = await SignRefreshToken(user._id);
      user.accessToken = accessToken;
      user.refreshToken = refreshToken
      await user.save();
      const basket = (await getBasketOfUser(user._id))?.[0];
      return res.status(HttpStatus.OK).json({
        statusCode : HttpStatus.OK,
        data: {
          accessToken,
          refreshToken,
          user,
          basket
        }
      })
    } catch (error) {
      next(error)
    }
  }
  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const mobile = await VerifyRefreshToken(refreshToken);
      const user = await UserModel.findOne({ mobile })
      const basket = (await getBasketOfUser(user._id))?.[0];
      const accessToken = await SignAccessToken(user._id);
      const newRefreshToken = await SignRefreshToken(user._id);
      user.accessToken = accessToken;
      user.refreshToken = newRefreshToken;
      await user.save()
      return res.status(HttpStatus.OK).json({
        StatusCode: HttpStatus.OK,
        data: {
          accessToken,
          refreshToken: newRefreshToken,
          user,
          basket
        }
      })
    } catch (error) {
      next(error)
    }
  }
  async saveUser(mobile, code) {
    const now = (new Date().getTime())
    let otp = {
      code,
      expiresIn: now  + 120000,
    }
    const user = await this.checkExistUser(mobile);
    if (user){
      console.log(user.otp, now);
      if (+user.otp.expiresIn > now) throw createError.Forbidden("کد اعتبار سنجی قبلی هنوز منقضی نشده است")
      return (await this.updateUser(mobile, { otp }))
    }
    throw createHttpError.Unauthorized("شما قبل از ورود باید ثبت نام کنید ")
    // !!(await UserModel.create({
    //   mobile,
    //   otp,
    //   Role: ROLES.USER
    // }))
  }
  async checkExistUser(mobile) {
    const user = await UserModel.findOne({ mobile });
    return user
  }
  async updateUser(mobile, objectData = {}) {
    Object.keys(objectData).forEach(key => {
      if (["", " ", 0, null, undefined, "0", NaN].includes(objectData[key])) delete objectData[key]
    })
    const updateResult = await UserModel.updateOne({ mobile }, { $set: objectData })
    return !!updateResult.modifiedCount
  }
}
module.exports = {
  UserAuthController: new UserAuthController()
}