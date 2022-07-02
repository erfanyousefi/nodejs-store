const Controller = require("./../controller")
const {StatusCodes: HttpStatus} = require("http-status-codes")
const { ConversationModel } = require("../../../models/conversation");
class MessageController extends Controller{

}
module.exports = {
    MessageController: new MessageController()
}