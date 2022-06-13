const mongoose= require("mongoose");

const RoleSchema = new mongoose.Schema({
    title: {type: String, unique: true},
    description: {type: String, default: ""},
    permissions: {type: [mongoose.Types.ObjectId], ref : 'permission', default: []}
}, {
    toJSON : {virtuals: true}
})

module.exports = {
    RoleModel : mongoose.model('role', RoleSchema)
}