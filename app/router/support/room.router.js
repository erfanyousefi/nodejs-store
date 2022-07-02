const { RoomController } = require("../../http/controllers/support/room.controller");
const { uploadFile } = require("../../utils/multer");
const router = require("express").Router();
router.post("/add",uploadFile.single("image"), RoomController.addRoom)
router.get("/list", RoomController.getListOfRooms)
module.exports = {
    ApiRoomRouter : router
}