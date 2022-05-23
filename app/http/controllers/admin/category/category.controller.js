const createError = require("http-errors");
const { CategoryModel } = require("../../../../models/categories");
const {
  addCategorySchema,
  updateCategorySchema,
} = require("../../../validators/admin/category.schema");
const { StatusCodes:HttpStatus} = require("http-status-codes")
const Controller = require("../../controller");
const mongoose = require("mongoose");
class CategoryController extends Controller {
  async addCategory(req, res, next) {
    try {
      await addCategorySchema.validateAsync(req.body);
      const { title, parent } = req.body;
      const category = await CategoryModel.create({ title, parent });
      if (!category) throw createError.InternalServerError("خطای داخلی");
      return res.status(HttpStatus.CREATED).json({
        data: {
          statusCode: HttpStatus.CREATED,
          message: "دسته بندی با موفقیت افزوده شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async removeCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await this.checkExistCategory(id);
      const deleteResult = await CategoryModel.deleteMany({
        $or: [{ _id: category._id }, { parent: category._id }],
      });
      if (deleteResult.deletedCount == 0)
        throw createError.InternalServerError("حدف دسته بندی انجام نشد");
      return res.status(HttpStatus.OK).json({
        data: {
          statusCode: HttpStatus.OK,
          message: "حذف دسته بندی با موفقیت انجام شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async editCategoryTitle(req, res, next) {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const category = await this.checkExistCategory(id);
      await updateCategorySchema.validateAsync(req.body);
      const resultOfUpdate = await CategoryModel.updateOne(
        { _id: id },
        { $set: {title} }
      );
      if (resultOfUpdate.modifiedCount == 0)
        throw createError.InternalServerError("به روزرسانی انجام نشد");
      return res.status(HttpStatus.OK).json({
        data: {
          statusCode: HttpStatus.OK,
          message: "به روز رسانی با موفقیت انجام شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllCategory(req, res, next) {
    try {
      // const category = await CategoryModel.aggregate([
      //     {
      //         $lookup : {
      //             from : "categories",
      //             localField : "_id",
      //             foreignField : "parent",
      //             as : "children",

      //         }
      //     },
      //     {
      //         $project : {
      //             __v : 0,
      //             "children.__v" : 0,
      //             "children.parent" : 0
      //         }
      //     },
      //     {
      //         $match : {
      //             parent : undefined
      //         }
      //     }
      // ])
      // const categories = await CategoryModel.aggregate([
      //     {
      //         $graphLookup : {
      //             from : "categories",
      //             startWith : "$_id",
      //             connectFromField : "_id",
      //             connectToField : "parent",
      //             maxDepth : 5,
      //             depthField : "depth",
      //             as : "children",

      //         }
      //     },
      //     {
      //         $project : {
      //             __v : 0,
      //             "children.__v" : 0,
      //             "children.parent" : 0
      //         }
      //     },
      //     {
      //         $match : {
      //             parent : undefined
      //         }
      //     }
      // ])
      const categories = await CategoryModel.find(
        { parent: undefined },
        { __v: 0 }
      );
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          categories,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getCategoryById(req, res, next) {
    try {
      const { id: _id } = req.params;
      const category = await CategoryModel.aggregate([
        {
          $match: { _id: mongoose.Types.ObjectId(_id) },
        },
        {
          $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "parent",
            as: "children",
          },
        },
        {
          $project: {
            __v: 0,
            "children.__v": 0,
            "children.parent": 0,
          },
        },
      ]);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          category,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllParents(req, res, next) {
    try {
      const parents = await CategoryModel.find(
        { parent: undefined },
        { __v: 0 }
      );
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          parents,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getchildOfParents(req, res, next) {
    try {
      const { parent } = req.params;
      const children = await CategoryModel.find(
        { parent },
        { __v: 0, parent: 0 }
      );
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          children,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllCategoryWithoutPopulate(req, res, next) {
    try {
      const categories = await CategoryModel.aggregate([{ $match: {} }]);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          categories,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async checkExistCategory(id) {
    const category = await CategoryModel.findById(id);
    if (!category) throw createError.NotFound("دسته بندی یافت نشد");
    return category;
  }
}
module.exports = {
  CategoryController: new CategoryController(),
};
