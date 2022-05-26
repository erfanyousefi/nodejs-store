const createHttpError = require("http-errors");
const { CourseModel } = require("../../../../models/course");
const Controller = require("../../controller");
const { CourseController } = require("./course.controller");
const { StatusCodes:  HttpStatus} = require("http-status-codes");
const { deleteInvalidPropertyInObject } = require("../../../../utils/functions");
class ChapterController extends Controller{
    async addChapter(req, res, next){
        try {
            const {id, title, text} = req.body;
            await CourseController.findCourseById(id)
            const saveChapterresult = await CourseModel.updateOne({_id : id}, {$push : {
                chapters : {title, text, episodes : []}
            }})
            if(saveChapterresult.modifiedCount == 0) throw createHttpError.InternalServerError('فصل افزوده نشد')
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data : {
                    message : "فصل با موفقیت ایجاد شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async chaptersOfCourse(req, res, next){
        try {
            const {courseID} = req.params;
            
            const course = await this.getChaptersOfCourse(courseID)
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data : {
                   course
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async removeChapterById(req, res, next){
        try {
            const {chapterID} = req.params
            await this.getOneChapter(chapterID);
            const removeChapterResult = await CourseModel.updateOne({"chapters._id": chapterID}, {
                $pull : {
                    chapters : {
                        _id : chapterID
                    }
                }
            })
            if(removeChapterResult.modifiedCount == 0) throw new createHttpError.InternalServerError("حذف فصل انجام نشد")
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data : {
                    message: "حذف فصل با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async updateChapterById(req, res, next){
        try {
            const {chapterID} = req.params;
            await this.getOneChapter(chapterID);
            const data = req.body;
            deleteInvalidPropertyInObject(data, ["_id"])
            const updateChapterResult = await CourseModel.updateOne(
                {"chapters._id" : chapterID}, 
                {$set : { "chapters.$" : data }}
            )
            if(updateChapterResult.modifiedCount == 0) 
                throw new createHttpError.InternalServerError('به روزرسانی فصل انجام نشد')
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "به روزرسانی باموفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getChaptersOfCourse(id){
        const chapters = await CourseModel.findOne({_id: id}, {chapters: 1, title: 1})
        if(!chapters) throw createHttpError.NotFound("دوره ای با این شناسه یافت نشد")
        return chapters
    }
    async getOneChapter(id){
        const chapter = await CourseModel.findOne({"chapters._id": id}, {"chapters.$" : 1})
        if(!chapter) throw new createHttpError.NotFound("فصلی با این شناسه یافت نشد")
        return chapter
    }
}
module.exports = {
    ChapterController : new ChapterController()
}