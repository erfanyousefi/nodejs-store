const Controller = require("./../controller")
const {StatusCodes: HttpStatus} = require("http-status-codes")
const { ConversationModel } = require("../../../models/conversation");
const { NamespaceController } = require("./namespace.controller");
const createHttpError = require("http-errors");
const path = require("path");
class RoomController extends Controller{
    async addRoom(req, res, next) {
        try {
            const {name, description, filename, fileUploadPath, namespace} = req.body;
            await this.findConversationWithEndpoint(namespace)
            await this.findRoomWithName(name)
            const image =  path.join(fileUploadPath, filename).replace(/\\/g, "/")
            const room = {name, description, image }
            await ConversationModel.updateOne({endpoint: namespace}, {
                $push: {rooms: room}
            })
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {
                    message: "اتاق با موفقیت ایجاد شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getListOfRooms(req, res, next) {
        try {
            const conversation = await ConversationModel.find({}, {rooms: 1});
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    rooms: conversation.rooms
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async findRoomWithName(name){
        const conversation = await ConversationModel.findOne({"rooms.name" : name});
        if(conversation) throw createHttpError.BadRequest("این اسم قبلا انتخاب شده است")
    }
    async findConversationWithEndpoint(endpoint){
        const conversation = await ConversationModel.findOne({endpoint});
        if(!conversation) throw createHttpError.NotFound("فضای مگالمه ای یافت نشد")
        return conversation
    }
}
module.exports = {
    RoomController: new RoomController()
}