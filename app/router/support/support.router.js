const { SupportController } = require("../../http/controllers/support/support.controller");
const { ApiNamespaceRouter } = require("./namespace.router");
const { ApiRoomRouter } = require("./room.router");

const router = require("express").Router();
router.use("/namespace", ApiNamespaceRouter)
router.use("/room", ApiRoomRouter)
router.get("/", SupportController.renderChatRoom)
module.exports = {
    SupportSectionRouter : router
}