const { VerifyAccessToken } = require("../../http/middlewares/verifyAccessToken");
const { BlogAdminApiRoutes } = require("./blog");
const { CategoryRoutes } = require("./category");
const router = require("express").Router();
/**
 * @swagger
 *  tags:
 *      -   name : Admin-Panel
 *          description : action of admin (add, remove, edit  and any do)
 *      -   name: Blog(AdminPanel)
 *          description: made blog managment admin panel 
 *      -   name: Category(AdminPanel)
 *          description: all method and routes about category section
 *      -   name: Prisma(Api)
 *          description: create some api's with prisma and postgreSQL category section
 */

router.use("/category", CategoryRoutes)
router.use("/blogs", VerifyAccessToken, BlogAdminApiRoutes)
module.exports = {
    AdminRoutes : router
}