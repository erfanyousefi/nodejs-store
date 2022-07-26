const { UserAuthController } = require("../../http/controllers/user/auth/auth.controller");

const router = require("express").Router();
router.post("/get-otp", UserAuthController.getOtp)
router.post("/check-otp", UserAuthController.checkOtp)
router.post("/refresh-token", UserAuthController.refreshToken)
router.post("/register", UserAuthController.register)

module.exports = {
    UserAuthRoutes : router
}