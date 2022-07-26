const { default: axios } = require("axios");
const createHttpError = require("http-errors");
const { PaymentModel } = require("../../../models/payments");
const { UserModel } = require("../../../models/users");
const { getBasketOfUser, invoiceNumberGenerator } = require("../../../utils/functions");
const Controller = require("../controller");
const moment = require("moment-jalali");
const {StatusCodes: HttpStatus} = require("http-status-codes");
const { default: mongoose } = require("mongoose");
const { DiscountModel } = require("../../../models/discount");
const { discountCodeSchema } = require("../../validators/admin/discount.schema");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
class PaymentController extends Controller{
    async PaymentGateway(req, res, next){
        try {
            const user = req.user
            const {discountCode} = await discountCodeSchema.validateAsync(req.body);
            let discount = {};
            if(discountCode) {
                discount = await DiscountModel.findOne({code : discountCode});
                if(!discount) throw createHttpError.BadRequest("کد تخفیف وارد شده وجود ندارد")
            }
            if(user.basket.courses.length == 0 && user.basket.products.length == 0) throw new createHttpError.BadRequest("سبد خرید شما خالی میباشد")
            const basket = (await getBasketOfUser(user._id, discount))?.[0];
            if(!basket?.payDetail?.paymentAmount) throw new createHttpError.BadRequest("مشخصات پرداخت یافت نشد")
           const zarinpal_request_url = "https://api.zarinpal.com/pg/v4/payment/request.json";
           const zarinpalGatewayURL = "https://www.zarinpal.com/pg/StartPay"
           const description = "بابت خرید دوره یا محصولات", amount =  basket?.payDetail?.paymentAmount
            const zapripal_options = {
                merchant_id: process.env.ZARINPAL_MERCHANTID,
                amount,
                description ,
                metadata:{
                    email: user?.email || "example@domain.com",
                    mobile: user.mobile
                },
                callback_url: "http://localhost:4000/verify"
            }
            const RequestResult = await axios.post(zarinpal_request_url, zapripal_options).then(result => result.data);
            const {authority, code} = RequestResult.data
            await PaymentModel.create({
                invoiceNumber: invoiceNumberGenerator(),
                paymentDate: moment().format("jYYYYjMMjDDHHmmss"),
                amount,
                user: user._id,
                description,
                authority,
                verify: false,
                basket

            })
            if(code == 100 && authority){
                return res.status(HttpStatus.OK).json({
                    statusCode: HttpStatus.OK,
                    data : {
                        code,
                        basket,
                        gatewayURL: `${zarinpalGatewayURL}/${authority}`
                    }
                })
            }
            throw createHttpError.BadRequest("اتصال به درگاه پرداخت انجام نشد")
        } catch (error) {
            next(error)
        }
    }
    async verifyPayment(req, res, next){
        try {
            const {Authority: authority} = req.query;
            const verifyURL = "https://api.zarinpal.com/pg/v4/payment/verify.json";
            const payment = await PaymentModel.findOne({authority});
            if(!payment) throw createHttpError.NotFound("تراکنش در انتظار پرداخت یافت نشد")
            if(payment.verify) throw createHttpError.BadRequest("تراکنش مورد نظر قبلا پرداخت شده")
            const verifyBody = JSON.stringify({
                authority,
                amount: payment.amount,
                merchant_id: process.env.ZARINPAL_MERCHANTID,
            })
            const verifyResult = await fetch(verifyURL, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: verifyBody
            }).then(result => result.json())
            if(verifyResult.data.code == 100){
                await PaymentModel.updateOne({authority}, {
                    $set: {
                        refID: verifyResult.data.ref_id,
                        cardHash: verifyResult.data.card_hash,
                        verify: true
                    }
                })
                const user = await UserModel.findById(payment.user)
                await UserModel.updateOne({_id: payment.user}, {
                    $set: {
                        Courses: [...payment?.basket?.payDetail?.courseIds || [], ...user.Courses],
                        Products: [...payment?.basket?.payDetail?.productIds || [], ...user.Products],
                        basket: {
                            courses: [],
                            products: []
                        }
                    }
                })
                return res.status(HttpStatus.OK).json({
                    statusCode: HttpStatus.OK,
                    data: {
                        message: "پرداخت شما با موفقیت انجام شد"
                    }
                })
            }
            throw createHttpError.BadRequest("پرداخت انجام نشد در صورت کسر وجه طی ۷۲ ساعت به حساب شما بازمیگردد")
        } catch (error) {
            next(error)
        }
    }
}
module.exports = {
    PaymentController : new PaymentController()
}