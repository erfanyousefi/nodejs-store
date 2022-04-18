const { ref } = require("@hapi/joi/lib/compile");
const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
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
    Roles : {type : [String], default : ["USER"]},
    Courses : {type: [mongoose.Types.ObjectId], ref : "course", default : []}
}, {
    timestamps : true,
    toJSON : {
        virtuals : true
    }
});
module.exports = {
    UserModel : mongoose.model("user", Schema)
}