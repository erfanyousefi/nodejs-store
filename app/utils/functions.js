const JWT = require("jsonwebtoken")
const createError = require("http-errors")
const { UserModel } = require("../models/users")
const { isRef } = require("@hapi/joi/lib/ref");
const fs = require("fs");
const path = require("path");
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require("./constans")
const redisClient = require("./init_redis")
function RandomNumberGenerator() {
    return Math.floor((Math.random() * 90000) + 10000)
}
function SignAccessToken(userId) {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userId)
        const payload = {
            mobile: user.mobile
        };
        const options = {
            expiresIn: "1d"
        };
        JWT.sign(payload, ACCESS_TOKEN_SECRET_KEY, options, (err, token) => {
            if (err) reject(createError.InternalServerError("خطای سروری"));
            resolve(token)
        })
    })
}
function SignRefreshToken(userId) {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userId)
        const payload = {
            mobile: user.mobile
        };
        const options = {
            expiresIn: "1y"
        };
        JWT.sign(payload, REFRESH_TOKEN_SECRET_KEY, options, async (err, token) => {
            if (err) reject(createError.InternalServerError("خطای سروری"));
            await redisClient.SETEX(userId, (365 * 24 * 60 * 60), token);
            resolve(token)
        })
    })
}
function VerifyRefreshToken(token) {
    return new Promise((resolve, reject) => {
        JWT.verify(token, REFRESH_TOKEN_SECRET_KEY, async (err, payload) => {
            if (err) reject(createError.Unauthorized("وارد حساب کاربری خود شوید"))
            const { mobile } = payload || {};
            const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 })
            if (!user) reject(createError.Unauthorized("حساب کاربری یافت نشد"))
            const refreshToken = await redisClient.get(user?._id || "key_default");
            if (!refreshToken) reject(createError.Unauthorized("ورود مجدد به حسابی کاربری انجام نشد"))
            if (token === refreshToken) return resolve(mobile);
            reject(createError.Unauthorized("ورود مجدد به حسابی کاربری انجام نشد"))
        })
    })
}

function deleteFileInPublic(fileAddress) {
    if (fileAddress) {
        const pathFile = path.join(__dirname, "..", "..", "public", fileAddress)
        if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile)
    }
}
function ListOfImagesFromRequest(files, fileUploadPath) {
    if (files?.length > 0) {
        return ((files.map(file => path.join(fileUploadPath, file.filename))).map(item => item.replace(/\\/g, "/")))
    } else {
        return []
    }
}
function setFeatures(body) {
    const {colors, width, weight, height, length} = body;
    let features = {};
    features.colors = colors;
    if(!isNaN(+width) || !isNaN(+height) || !isNaN(+weight) || !isNaN(+length)){
        if(!width) features.width = 0;
        else features.width = +width;
        if(!height) features.height = 0;
        else features.height = +height;
        if(!weight) features.weight = 0;
        else features.weight = +weight;
        if(!length) features.length = 0;
        else features.length = +length;
      }
    return features
}
function copyObject(object) {
    return JSON.parse(JSON.stringify(object))
}
module.exports = {
    RandomNumberGenerator,
    SignAccessToken,
    SignRefreshToken,
    VerifyRefreshToken,
    deleteFileInPublic,
    ListOfImagesFromRequest,
    copyObject,
    setFeatures
}