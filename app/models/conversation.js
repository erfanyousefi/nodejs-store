const { default: mongoose } = require("mongoose");
const messageSchema = new mongoose.Schema({
    sender: {type: mongoose.Types.ObjectId, ref: "user"},
    message: {type: String},
    dateTime: {type: String}
})
const roomSchema = new mongoose.Schema({
    name: {type: String},
    description: {type: String},
    image: {type: String},
    messages: {type: [messageSchema], default: []}
})
const conversationSchema = new mongoose.Schema({
    title: {type: String, required: true},
    endpoint: {type: String, required: true},
    rooms: {type: [roomSchema], default: []}
})
module.exports = {
    ConversationModel: mongoose.model("conversation", conversationSchema)
}