const { ProductModel } = require("../../../models/products");
const { deleteFileInPublic, ListOfImagesFromRequest } = require("../../../utils/functions");
const path = require("path")
const {
  createProductSchema,
} = require("../../validators/admin/product.schema");
const Controller = require("../controller");
const { createBrotliCompress } = require("zlib");

class ProductController extends Controller {
  async addProduct(req, res, next) {
    try {
      const images = ListOfImagesFromRequest(req?.files || [], req.body.fileUploadPath)
      const productBody = await createProductSchema.validateAsync(req.body);
      const { title, text, short_text, category, tags, count, price, discount, type, width, height, weight, length, colors } = productBody;
      const supplier = req.user._id;

      let feture = {}
      feture.colors = colors;
      if(isNaN(width) || isNaN(height) || isNaN(weight) || isNaN(length)){
        if(!width) feture.width = 0;
        else feture.width = width;
        if(!height) feture.height = 0;
        else feture.height = height;
        if(!weight) feture.weight = 0;
        else feture.weight = weight;
        if(!length) feture.length = 0;
        else feture.length = length;
      }

      const product = await ProductModel.create({ 
        title, 
        text, 
        short_text, 
        category, 
        tags, 
        count, 
        price, 
        discount, 
        images, 
        feture,
        supplier,
        type
      })
      return res.json({
        data: {
          statusCode : 201,
          message : "ثبت محصول با موفقیت انجام شد"
        }
      });
    } catch (error) {
      deleteFileInPublic(req.body.image)
      next(error);
    }
  }
  editProduct(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  removeProduct(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async getAllProducts(req, res, next) {
    try {
      const products = await ProductModel.find({})
      return res.status(200).json({
        data : {
          statusCode : 200,
          products
        }
      })
    } catch (error) {
      next(error);
    }
  }
  getOneProduct(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}
module.exports = {
  ProductController: new ProductController(),
};
