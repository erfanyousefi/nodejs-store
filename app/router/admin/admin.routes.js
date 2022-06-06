const { AdminApiBlogRouter } = require("./blog");
const { AdminApiCategoryRouter } = require("./category");
const { AdminApiChapterRouter } = require("./chapter");
const { AdminApiCourseRouter } = require("./course");
const { AdminApiEpisodeRouter } = require("./episode");
const { AdminApiProductRouter } = require("./product");
const { AdminApiUserRouter } = require("./user");
const router = require("express").Router();
router.use("/category", AdminApiCategoryRouter)
router.use("/blogs", AdminApiBlogRouter)
router.use("/products", AdminApiProductRouter)
router.use("/courses", AdminApiCourseRouter)
router.use("/chapter", AdminApiChapterRouter)
router.use("/episode", AdminApiEpisodeRouter)
router.use("/user", AdminApiUserRouter)
module.exports = {
    AdminRoutes : router
}