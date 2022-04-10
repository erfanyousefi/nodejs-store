const { CategoryController } = require("../../http/controllers/admin/category.controller");

const router = require("express").Router();

/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: [Category(AdminPanel)]
 *          summary: create new category title
 *          parameters:
 *              -   in: formData
 *                  type: string
 *                  required: true
 *                  name: title
 *              -   in: formData
 *                  type: string
 *                  required: false
 *                  name: parent
 *          responses:
 *              201:
 *                  description: success
 */
router.post("/add", CategoryController.addCategory)
/**
 * @swagger
 *  /admin/category/parents:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summary: get All parents of Category or Category Heads
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/parents", CategoryController.getAllParents)
/**
 * @swagger
 *  /admin/category/children/{parent}:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summary: get All children of Parents Category 
 *          parameters:
 *              -   in: path
 *                  name: parent
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/children/:parent", CategoryController.getchildOfParents)
/**
 * @swagger
 *  /admin/category/all:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summary: get All Categories 
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/all", CategoryController.getAllCategory)
/**
 * @swagger
 *  /admin/category/remove/{id}:
 *      delete:
 *          tags: [Category(AdminPanel)]
 *          summary: remove category with object-id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required : true
 *          responses:
 *              200:
 *                  description: success
 */
router.delete("/remove/:id", CategoryController.removeCategory)
/**
 * @swagger
 *  /admin/category/list-of-all:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summary: get all categories without populate and nested structure
 *          responses:
 *              200:
 *                  description: success
 */
 router.get("/list-of-all", CategoryController.getAllCategoryWithoutPopulate)
/**
 * @swagger
 *  /admin/category/{id}:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summary: find category by object-id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required : true
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/:id", CategoryController.getCategoryById)
/**
 * @swagger
 *  /admin/category/update/{id}:
 *      patch:
 *          tags: [Category(AdminPanel)]
 *          summary: edit or update category title with object id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required : true
 *              -   in: formData
 *                  name: title
 *                  type: string
 *                  required : true
 *          responses:
 *              200:
 *                  description: success
 *              500:    
 *                  description: internalServerErorr
 */
router.patch("/update/:id", CategoryController.editCategoryTitle)

module.exports = {
    CategoryRoutes : router
}