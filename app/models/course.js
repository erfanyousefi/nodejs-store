const { default: mongoose } = require("mongoose");
const { CommentSchema } = require("./public.schema");
const Episodes = mongoose.Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    type: {type: String, default: "unlock"},
    time: {type: String, required : true}, 
})
const Chapter = mongoose.Schema({
    title : {type: String, required : true},
    text: {type: String, default : ""},
    episodes : {type: [Episodes], default : []}
})
const CourseSchema = new mongoose.Schema({
    title : {type: String, required : true},
    short_text : {type: String, required : true},
    text : {type: String, required : true},
    image : {type: String, required : true},
    tags : {type: [String], default : []},
    category : {type: mongoose.Types.ObjectId, ref: "category", required : true},
    comments : {type: [CommentSchema], default : []},
    likes : {type: [mongoose.Types.ObjectId], default : []},
    deslikes : {type: [mongoose.Types.ObjectId], default : []},
    bookmarks : {type: [mongoose.Types.ObjectId], default : []},
    price : {type: Number, default : 0},
    discount : {type: Number, default : 0},
    type : {type: String, default: "free"/*free, cash, special */, required : true},
    status: {type: String, default: "notStarted" /*notStarted, Completed, Holding*/},
    time : {type: String, default : "00:00:00"},
    teacher : {type: mongoose.Types.ObjectId, ref: "user", required : true},
    chapters : {type: [Chapter], default: []},
    students : {type : [mongoose.Types.ObjectId], default : [], ref: "user"}
}, {
    toJSON: {
        virtuals: true
    }
});
CourseSchema.index({title: "text", short_text: "text", text : "text"})
module.exports = {
    CourseModel : mongoose.model("course", CourseSchema)
}