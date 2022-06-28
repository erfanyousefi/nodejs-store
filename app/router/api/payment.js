const { PaymentController } = require("../../http/controllers/api/payment.controller");
const { VerifyAccessToken } = require("../../http/middlewares/verifyAccessToken");

const router = require("express").Router();
router.post("/payment", VerifyAccessToken, PaymentController.PaymentGateway)
router.get("/verify", PaymentController.verifyPayment)
module.exports = {
    ApiPayment : router
}
//---------Shaparak - BankMelat bmp - pasargad - saman - -------------
//1- peyment
//2- checkTransaction
//3- verifyTransaction

//----------- Zarinpal - digipay - capilapay ------------------
//1- peyment
//2- verify