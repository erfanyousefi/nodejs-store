const { ConversationModel } = require("../models/conversation");

module.exports = class NamespaceSocketHandler{
    #io;
    constructor(io){
        this.#io = io
    }
    initConnection(){
        this.#io.on("connection", async socket => {
            const namespaces = await ConversationModel.find({}, {title: 1, endpoint: 1}).sort({_id: -1})
            socket.emit("namespacesList", namespaces)
        })
    }
    async createNamespacesConnection(){
        const namespaces = await ConversationModel.find({}, {title: 1, endpoint: 1, rooms:1}).sort({_id: -1})
        for (const namespace of namespaces) {
            this.#io.of(`/${namespace.endpoint}`).on("connection", async socket => {
                socket.emit("roomList", namespace.rooms)
            })
        }
    }
} 