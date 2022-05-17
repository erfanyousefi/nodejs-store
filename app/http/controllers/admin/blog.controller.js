const { createBlogSchema } = require("../../validators/admin/blog.schema")
const Controller = require("./../controller")
const path = require("path");
const { BlogModel } = require("../../../models/blogs");
const { deleteFileInPublic } = require("../../../utils/functions");
const { StatusCodes:HttpStatus} = require("http-status-codes")
const createError = require("http-errors")
class BlogController extends Controller {
    async createBlog(req, res, next){
        try {
            const blogDataBody = await createBlogSchema.validateAsync(req.body);
            req.body.image =path.join(blogDataBody.fileUploadPath, blogDataBody.filename)
            req.body.image = req.body.image.replace(/\\/g, "/")
            const {title, text, short_text, category, tags} = blogDataBody;
            const image =  req.body.image
            const author = req.user._id 
            const blog = await BlogModel.create({title,image, text, short_text, category, tags, author})
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data : {
                    message : "ایجاد بلاگ با موفقیت انجام شد"
                }
            })
        } catch (error) {
            deleteFileInPublic(req.body.image)
            next(error)
        }
    }
    async getOneBlogById(req, res, next){
        try {
            const {id} = req.params;
            const blog = await this.findBlog(id);
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK,
                data : {
                    blog
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getListOfBlogs(req, res, next){
        try {
            const blogs = await BlogModel.aggregate([
                {$match : {}},
                {
                    $lookup : {
                        from : "users",
                        foreignField : "_id",
                        localField : "author",
                        as : "author"
                    }
                },
                {
                    $unwind : "$author"
                },
                {
                    $lookup : {
                        from : "categories",
                        foreignField : "_id",
                        localField : "category",
                        as : "category"
                    }
                },
                {
                    $unwind : "$category"
                },
                {
                    $project : {
                        "author.__v" :0,
                        "category.__v" :0,
                        "author.otp" : 0,
                        "author.Roles" : 0,
                        "author.discount" : 0,
                        "author.bills" : 0,
                    }
                }
            ])
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data:{
                    blogs
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getCommetsOfBlog(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async deleteBlogById(req, res, next){
        try {
            const {id} = req.params;
            await this.findBlog(id);
            const result = await BlogModel.deleteOne({_id : id});
            if(result.deletedCount == 0) throw createError.InternalServerError("حذف انجام نشد");
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK,
                data : {
                    message : "حذف مقاله با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async updateBlogById(req, res, next){
        try {
            const {id} = req.params;
            await this.findBlog(id);
            if(req?.body?.fileUploadPath &&  req?.body?.filename){
                req.body.image = path.join(req.body.fileUploadPath, req.body.filename)
                req.body.image = req.body.image.replace(/\\/g, "/")
            }
            const data = req.body;
            let nullishData = ["", " ", "0", 0, null, undefined]
            let blackListFields = ["bookmarks", "deslikes", "comments", "likes", "author"]
            Object.keys(data).forEach(key => {
                if(blackListFields.includes(key)) delete data[key]
                if(typeof data[key] == "string") data[key] = data[key].trim();
                if(Array.isArray(data[key]) && data[key].length > 0 ) data[key] = data[key].map(item => item.trim()) 
                if(nullishData.includes(data[key])) delete data[key];
            })
            const updateResult = await BlogModel.updateOne({_id : id}, {$set : data})
            if(updateResult.modifiedCount == 0) throw createError.InternalServerError("به روز رسانی انجام نشد")

            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data : {
                    message : "به روز رسانی بلاگ با موفقیت انجام شد"
                }
            })
        } catch (error) {
            deleteFileInPublic(req?.body?.image)
            next(error)
        }
    }
    async findBlog(id) {
        const blog = await BlogModel.findById(id).populate([{path : "category", select : ['title']}, {path: "author", select : ['mobile', 'first_name', 'last_name', 'username']}]);
        if(!blog) throw createError.NotFound("مقاله ای یافت نشد");
        delete blog.category.children
        return blog
    }
}

module.exports = {
    AdminBlogController : new BlogController()
}