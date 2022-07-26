const { default: mongoose } = require("mongoose");

const discountSchema = new mongoose.Schema({
    code: {type: String, required: true, unique: true},
    course: {type: mongoose.Types.ObjectId, ref: "course", required: true},
    value: {type: Number, required: true}
})
const DiscountModel = mongoose.model("discount", discountSchema)
module.exports = {
    DiscountModel
}