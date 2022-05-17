const { CourseController } = require("../../http/controllers/admin/course.controller");
const { stringToArray } = require("../../http/middlewares/stringToarray");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();
router.post("/add", uploadFile.single("image"), stringToArray("tags"),CourseController.addCourse)
router.get("/list", CourseController.getListOfCourse) //get all course
router.get("/:id", CourseController.getCourseById) //get all course
// router.post() //create new course
// router.put() //create new chapter
// router.put() //create new episode
// router.delete() // remove a course
// router.patch() // edit a course
// router.get() // get a course
module.exports = {
    AdminApiCourseRouter : router
}