const { VerifyAccessToken } = require("../../http/middlewares/verifyAccessToken");
const { BlogAdminApiRoutes, AdminApiBlogRouter } = require("./blog");
const { CategoryRoutes, AdminApiCategoryRouter } = require("./category");
const { AdminApiProductRouter } = require("./product");
const router = require("express").Router();
/**
 * @swagger
 *  tags:
 *      -   name : Admin-Panel
 *          description : action of admin (add, remove, edit  and any do)
 *      -   name: Product(AdminPanel)
 *          description : management product routes
 *      -   name: Blog(AdminPanel)
 *          description: made blog managment admin panel 
 *      -   name: Category(AdminPanel)
 *          description: all method and routes about category section
 *      -   name: Prisma(Api)
 *          description: create some api's with prisma and postgreSQL category section
 */

router.use("/category", AdminApiCategoryRouter)
router.use("/blogs", AdminApiBlogRouter)
router.use("/products", AdminApiProductRouter)
module.exports = {
    AdminRoutes : router
}