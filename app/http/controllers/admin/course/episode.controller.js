const { createEpisodeSchema } = require("../../../validators/admin/course.schema");
const Controller = require("../../controller");

class EpisodeController extends Controller{
    async addNewEpisode(req, res, next){
        try {
            const {title, time, text, chapterID, courseID} = await createEpisodeSchema.validateAsync(req.body);
        } catch (error) {
            next(error)
        }
    }
}
module.exports = {
    EpisodeController: new EpisodeController()
}