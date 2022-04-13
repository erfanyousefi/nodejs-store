const { createBlogSchema } = require("../../validators/admin/blog.schema")
const Controller = require("./../controller")
const path = require("path");
const { BlogModel } = require("../../../models/blogs");
const { deleteFileInPublic } = require("../../../utils/functions");

class BlogController extends Controller {
    async createBlog(req, res, next){
        try {
            const blogDataBody = await createBlogSchema.validateAsync(req.body);
            req.body.image =path.join(blogDataBody.fileUploadPath, blogDataBody.filename)
            req.body.image = req.body.image.replace(/\\/g, "/")
            const {title, text, short_text, category, tags} = blogDataBody;
            const image =  req.body.image 
            const blog = await BlogModel.create({title,image, text, short_text, category, tags})
            return res.json({blog})
        } catch (error) {
            deleteFileInPublic(req.body.image)
            next(error)
        }
    }
    async getOneBlogById(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async getListOfBlogs(req, res, next){
        try {
            return res.status(200).json({
                statusCode: 200,
                data:{
                    blogs : []
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
            
        } catch (error) {
            next(error)
        }
    }
    async updateBlogById(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    AdminBlogController : new BlogController()
}