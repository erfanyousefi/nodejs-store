const router = require("express").Router();
const prisma = (new require("@prisma/client").PrismaClient()).
/**
 * @swagger
 *  /blogs/list:
 *      get:
 *          summary: get list of blogs with postgreSQL and prisma
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/list", async(req, res, next) => {
    try {
        await prisma.Category.create({
            data : {
                name : "any things"
            }
        });
     await prisma.Blog.create({
         data : {
             title : "any things",
             short_text : "any text",
             text : "text",
             category_id : 1
         }
     });
     
        const blogs = await prisma.Blog.findMany({});
        return res.send(blogs)
    } catch (error) {
        next(error)
    }
})
module.exports = {
    blogApiPrisma : router
}