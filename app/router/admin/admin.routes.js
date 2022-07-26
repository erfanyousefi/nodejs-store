const {
    checkPermission
} = require("../../http/middlewares/permission.guard");
const {
    PERMISSIONS
} = require("../../utils/constans");
const {
    AdminApiBlogRouter
} = require("./blog");
const {
    AdminApiCategoryRouter
} = require("./category");
const {
    AdminApiChapterRouter
} = require("./chapter");
const {
    AdminApiCourseRouter
} = require("./course");
const { AdminApiDiscountRouter } = require("./discount");
const {
    AdminApiEpisodeRouter
} = require("./episode");
const {
    AdminApiPermissionRouter
} = require("./permission");
const {
    AdminApiProductRouter
} = require("./product");
const {
    AdminApiRoleRouter
} = require("./role");
const { AdminApiTransactionRouter } = require("./transaction");
const {
    AdminApiUserRouter
} = require("./user");
const router = require("express").Router();
router.use("/category", 
    checkPermission([PERMISSIONS.CONTENT_MANAGER]), 
    AdminApiCategoryRouter)
router.use("/blogs",
    checkPermission([PERMISSIONS.TEACHER]),
    AdminApiBlogRouter)
router.use("/products",
    checkPermission([PERMISSIONS.SUPPLIER,
        PERMISSIONS.CONTENT_MANAGER
    ]), AdminApiProductRouter)
router.use("/courses",
    checkPermission([PERMISSIONS.TEACHER]),
    AdminApiCourseRouter)
router.use("/chapter",
    checkPermission([PERMISSIONS.TEACHER]),
    AdminApiChapterRouter)
router.use("/episode",
    checkPermission([PERMISSIONS.TEACHER]), 
    AdminApiEpisodeRouter)
router.use("/user",
    AdminApiUserRouter)
router.use("/permission",
    checkPermission([PERMISSIONS.ADMIN]),
    AdminApiPermissionRouter)
router.use("/role",
    checkPermission(PERMISSIONS.ADMIN),
    AdminApiRoleRouter)
router.use("/transactions",
    checkPermission(PERMISSIONS.ADMIN),
    AdminApiTransactionRouter)
router.use("/discount",
    checkPermission(PERMISSIONS.ADMIN),
    AdminApiDiscountRouter)
module.exports = {
    AdminRoutes: router
}