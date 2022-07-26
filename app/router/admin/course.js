const { CourseController } = require("../../http/controllers/admin/course/course.controller");
const { stringToArray } = require("../../http/middlewares/stringToarray");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();
router.post("/add", uploadFile.single("image"), stringToArray("tags"),CourseController.addCourse)
router.get("/list", CourseController.getListOfCourse) //get all course
router.get("/:id", CourseController.getCourseById) //get all course
router.patch("/update/:id",uploadFile.single("image"), CourseController.updateCourseById) // edit a course
router.patch("/change-discount-status/:id", CourseController.changeCourseDiscountStatus) // edit a course
// router.put() //create new episode
// router.delete() // remove a course
// router.get() // get a course
module.exports = {
    AdminApiCourseRouter : router
}