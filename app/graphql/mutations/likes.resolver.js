const { GraphQLString } = require("graphql");
const { ProductModel } = require("../../models/products");
const { ResponseType } = require("../typeDefs/public.types");
const {StatusCodes: HttpStatus} = require("http-status-codes");
const { VerifyAccessTokenInGraphQL } = require("../../http/middlewares/verifyAccessToken");
const { CourseModel } = require("../../models/course");
const { BlogModel } = require("../../models/blogs");
const { checkExistBlog, checkExistCourse, checkExistProduct } = require("../utils");

const LikeProduct = {
    type: ResponseType,
    args : {
        productID: {type: GraphQLString}
    },
    resolve : async (_, args, context) => {
        const {req} = context;
        const user = await VerifyAccessTokenInGraphQL(req)
        const {productID} = args
        await checkExistProduct(productID)
        let likedproduct = await ProductModel.findOne({
            _id: productID,
            likes : user._id
        })
        let disLikedproduct = await ProductModel.findOne({
            _id: productID,
            dislike : user._id
        })
        const updateQuery = likedproduct? {$pull:{likes: user._id}} : {$push: {likes: user._id}}
        await ProductModel.updateOne({ _id: productID }, updateQuery)
        let message
        if(!likedproduct){
            if(disLikedproduct) await ProductModel.updateOne({ _id: productID }, {$pull: {dislike: user._id}})
            message = "پسندیدن محصول با موفقیت انجام شد"
        } else message = "پسندیدن محصول لغو شد"
        return {
            statusCode: HttpStatus.CREATED,
            data : {
                message
            }
        }
    }
}
const LikeCourse = {
    type: ResponseType,
    args : {
        courseID: {type: GraphQLString}
    },
    resolve : async (_, args, context) => {
        const {req} = context;
        const user = await VerifyAccessTokenInGraphQL(req)
        const {courseID} = args
        await checkExistCourse(courseID)
        let likedcourse = await CourseModel.findOne({
            _id: courseID,
            likes : user._id
        })
        let disLikedCourse = await CourseModel.findOne({
            _id: courseID,
            dislike : user._id
        })
        const updateQuery = likedcourse? {$pull:{likes: user._id}} : {$push: {likes: user._id}}
        await CourseModel.updateOne({ _id: courseID }, updateQuery)
        let message;
        if(!likedcourse){
            if(disLikedCourse) await CourseModel.updateOne({ _id: courseID }, {$pull: {dislike: user._id}})
            message = "پسندیدن دوره با موفقیت انجام شد"
        } else message = "پسندیدن دوره لغو شد"
        return {
            statusCode: HttpStatus.CREATED,
            data : {
                message
            }
        }
    }
}
const LikeBlog = {
    type: ResponseType,
    args : {
        blogID: {type: GraphQLString}
    },
    resolve : async (_, args, context) => {
        const {req} = context;
        const user = await VerifyAccessTokenInGraphQL(req)
        const {blogID} = args
        await checkExistBlog(blogID)
        let likedBlog = await BlogModel.findOne({
            _id: blogID,
            likes : user._id
        })
        let disLikedBlog = await BlogModel.findOne({
            _id: blogID,
            dislike : user._id
        })
        const updateQuery = likedBlog? {$pull:{likes: user._id}} : {$push: {likes: user._id}}
        await BlogModel.updateOne({ _id: blogID }, updateQuery)
        let message
        if(!likedBlog){
            if(disLikedBlog) await BlogModel.updateOne({ _id: blogID }, {$pull: {dislike: user._id}})
            message = "پسندیدن مقاله با موفقیت انجام شد"
        } else message = "پسندیدن مقاله لغو شد"
        return {
            statusCode: HttpStatus.CREATED,
            data : {
                message
            }
        }
    }
}
module.exports = {
    LikeProduct,
    LikeBlog,
    LikeCourse
}