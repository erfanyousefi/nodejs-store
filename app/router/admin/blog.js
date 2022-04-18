const blogController = require("../../http/controllers/admin/blog.controller");
const { AdminBlogController } = require("../../http/controllers/admin/blog.controller");
const { stringToArray } = require("../../http/middlewares/stringToarray");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();
/**
 * @swagger
 *  components:
 *      schemas:
 *          Blog:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   image
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  short_text:
 *                      type: string
 *                      description: the summary of text of blog
 *                  text:
 *                      type: string
 *                      description: the text of blog
 *                  tags:
 *                      type: string
 *                      description: the list of tags for example(tag1#tag2#tag_foo)
 *                  category:
 *                      type: string
 *                      description: the id of category for foreinField in blog
 *                  image:
 *                      type: file
 *                      description: the index picture of blog
 *          BlogUpdate:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  short_text:
 *                      type: string
 *                      description: the summary of text of blog
 *                  text:
 *                      type: string
 *                      description: the text of blog
 *                  tags:
 *                      type: string
 *                      description: the list of tags for example(tag1#tag2#tag_foo)
 *                  category:
 *                      type: string
 *                      description: the id of category for foreinField in blog
 *                  image:
 *                      type: file
 *                      description: the index picture of blog
 */ 

/**
 * @swagger
 *  /admin/blogs:
 *      get:
 *          tags: [ Blog(AdminPanel)]
 *          summary: get all blogs
 *          responses:
 *              200:
 *                  description: success - get array of blogs
 */
router.get("/", AdminBlogController.getListOfBlogs)
/**
 * @swagger
 *  /admin/blogs/add:
 *      post:
 *          tags: [ Blog(AdminPanel)]
 *          summary: create Blog document
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Blog'
 *          responses:
 *              201:
 *                  description: created
 */
router.post("/add",uploadFile.single("image"), stringToArray("tags"), AdminBlogController.createBlog)
/**
 * @swagger
 *  /admin/blogs/update/{id}:
 *      patch:
 *          tags: [ Blog(AdminPanel)]
 *          summary: update  Blog document by id 
 *          consumes: 
 *              -   multipart/form-data
 *          parameters:
 *              -   in: path
 *                  required: true
 *                  name: id
 *                  type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/BlogUpdate'
 *          responses:
 *              200:
 *                  description: success
 */
router.patch("/update/:id",uploadFile.single("image"), stringToArray("tags"), AdminBlogController.updateBlogById)
/**
 * @swagger
 *  /admin/blogs/{id}:
 *      get:
 *          summary: get blog by ID and populate this field 
 *          tags: [ Blog(AdminPanel) ]
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/:id", AdminBlogController.getOneBlogById);
/**
 * @swagger
 *  /admin/blogs/{id}:
 *      delete:
 *          summary: remove blog by ID 
 *          tags: [ Blog(AdminPanel) ]
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
router.delete("/:id", AdminBlogController.deleteBlogById);
module.exports = {
    AdminApiBlogRouter : router
}