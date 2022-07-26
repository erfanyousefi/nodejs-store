const { CourseController } = require("../../http/controllers/admin/course/course.controller");
const { DiscountController } = require("../../http/controllers/admin/discount/discount");
const { stringToArray } = require("../../http/middlewares/stringToarray");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();
router.post("/add", DiscountController.saveDiscount)
router.get("/list", DiscountController.listOfDiscounts) 
router.delete("/delete/:id", DiscountController.removeDiscountById)

module.exports = {
    AdminApiDiscountRouter : router
}