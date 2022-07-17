const { ref } = require("@hapi/joi/lib/compile");
const { default: mongoose } = require("mongoose");
const ProductSchema = new mongoose.Schema({
    productID: {type: mongoose.Types.ObjectId, ref: "product"},
    count: {type: Number, default: 1}
})
const CourseSchema = new mongoose.Schema({
    courseID: {type: mongoose.Types.ObjectId, ref: "course"},
    count: {type: Number, default: 1}
})
const BasketSchema = new mongoose.Schema({
    courses: {type: [CourseSchema], default: []},
    products: {type: [ProductSchema], default: []},
})
const UserSchema = new mongoose.Schema({
    first_name : {type : String},
    last_name : {type : String},
    username : {type : String, lowercase : true},
    mobile : {type : String, required : true},
    email : {type : String, lowercase : true},
    password : {type : String},
    otp : {type : Object, default : {
        code : 0,
        expiresIn : 0
    }},
    bills : {type : [], default : []},
    discount : {type : Number, default : 0},
    birthday : {type : String},
    token : {type : String, default: ""},
    Role : {type : String, default : "USER"},
    Courses : {type: [mongoose.Types.ObjectId], ref : "course", default : []},
    Products : {type: [mongoose.Types.ObjectId], ref : "product", default : []},
    basket: {type: BasketSchema}
}, {
    timestamps : true,
    toJSON : {
        virtuals : true
    }
});
UserSchema.index({first_name: "text", last_name: "text", username: "text", mobile: "text", email: "text"})
module.exports = {
    UserModel : mongoose.model("user", UserSchema)
}