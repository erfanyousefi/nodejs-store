const { ConversationModel } = require("../../../models/conversation");
const Controller = require("./../controller")
const {StatusCodes: HttpStatus} = require("http-status-codes");
const createHttpError = require("http-errors");
class NamespaceController extends Controller{
    async addNamespace(req, res, next) {
        try {
            const {title, endpoint} = req.body;
            await this.findNamespaceWithEndpoint(endpoint)
            const conversation = await ConversationModel.create({title, endpoint})
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {
                    message: "فضای مکالمه با موفقیت ایجاد شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getListOfNamespaces(req, res, next) {
        try {
            const namespaces = await ConversationModel.find({}, {rooms: 0});
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    namespaces
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async findNamespaceWithEndpoint(endpoint){
        const conversation = await ConversationModel.findOne({endpoint});
        if(conversation) throw createHttpError.BadRequest("این اسم قبلا انتخاب شده است")
    }
}
module.exports = {
    NamespaceController: new NamespaceController()
}