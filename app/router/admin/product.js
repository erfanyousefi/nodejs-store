const { ProductController } = require("../../http/controllers/admin/product.controller");
const { stringToArray } = require("../../http/middlewares/stringToarray");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();
router.post("/add", uploadFile.array("images", 10), stringToArray("tags", "colors"),ProductController.addProduct)
router.get("/list",ProductController.getAllProducts)
router.get("/:id", ProductController.getOneProduct)
router.delete("/remove/:id", ProductController.removeProductById)
 router.patch("/edit/:id", uploadFile.array("images", 10), stringToArray("tags", "colors"),ProductController.editProduct)

// router.patch()
// router.get()
module.exports = {
    AdminApiProductRouter : router
}
