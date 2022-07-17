const { UserModel } = require("../../models/users");

async function checkLogin(req, res, next){
    try {
        const token = req.signedCookies["authorization"];
        if(token){
            const user = await UserModel.findOne({token}, {basket: 0, password: 0, Products: 0, Courses: 0})
            if(user){
                req.user = user;
                return next()
            }
        }
        return res.render("login.ejs", {
            error : "شما باید وارد حساب کاربری خود شوید"
        })
    } catch (error) {
        next(error)
    }
}
async function checkAccessLogin(req, res, next){
    try {
        const token = req.signedCookies["authorization"];
        if(token){
            const user = await UserModel.findOne({token}, {basket: 0, password: 0, Products: 0, Courses: 0})
            if(user){
                req.user = user;
                return res.redirect("/support")
            }
        }
        return next()
    } catch (error) {
        next(error)
    }
}
module.exports = {
    checkLogin,
    checkAccessLogin
}