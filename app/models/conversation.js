const { default: mongoose } = require("mongoose");
const messageSchema = new mongoose.Schema({
    sender: {type: mongoose.Types.ObjectId, ref: "user"},
    message: {type: String},
    dateTime: {type: Number}
})
const LocationSchema = new mongoose.Schema({
    sender: {type: mongoose.Types.ObjectId, ref: "user"},
    location: {type: Object, default: {}},
    dateTime: {type: Number}
})
const roomSchema = new mongoose.Schema({
    name: {type: String},
    description: {type: String},
    image: {type: String},
    messages: {type: [messageSchema], default: []},
    locations: {type: [LocationSchema], default: []},

})
const conversationSchema = new mongoose.Schema({
    title: {type: String, required: true},
    endpoint: {type: String, required: true},
    rooms: {type: [roomSchema], default: []}
})
module.exports = {
    ConversationModel: mongoose.model("conversation", conversationSchema)
}