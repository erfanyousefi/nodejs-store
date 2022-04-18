const { default: mongoose } = require("mongoose");
const { CommentSchema } = require("./public.schema");

const Schema = new mongoose.Schema({
    title : {type: String, required : true},
    short_text : {type: String, required : true},
    text : {type: String, required : true},
    images : {type: [String], required : true},
    tags : {type: [String], default : []},
    category : {type: mongoose.Types.ObjectId, ref: "category", required : true},
    comments : {type: [CommentSchema], default : []},
    likes : {type: [mongoose.Types.ObjectId], default : []},
    deslikes : {type: [mongoose.Types.ObjectId], default : []},
    bookmarks : {type: [mongoose.Types.ObjectId], default : []},
    price : {type: Number, default : 0},
    discount : {type: Number, default : 0},
    count : {type: Number},
    type : {type: String, required : true}, //virtual - physici
    format : {type: String},
    supplier : {type: mongoose.Types.ObjectId, required : true},
    feture : {type: Object, default : {
        length : "",
        height : "",
        width : "",
        weight : "",
        colors : [],
        madein : ""
    }},
});
module.exports = {
    ProductModel : mongoose.model("product", Schema)
}