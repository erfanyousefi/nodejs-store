const { GraphQLList, GraphQLString } = require("graphql");
const { VerifyAccessTokenInGraphQL } = require("../../http/middlewares/verifyAccessToken");
const { BlogModel } = require("../../models/blogs");
const { CourseModel } = require("../../models/course");
const { ProductModel } = require("../../models/products");
const { UserModel } = require("../../models/users");
const { BlogType } = require("../typeDefs/blog.type");
const { CourseType } = require("../typeDefs/course.type");
const { ProductType } = require("../typeDefs/product.type");
const { AnyType } = require("../typeDefs/public.types");

const getUserBookmarkedBlogs = {
    type : new GraphQLList(BlogType),
    resolve : async (_, args, context) => {
        const {req} = context;
        const user = await VerifyAccessTokenInGraphQL(req)
        const blogs = await BlogModel.find({bookmarks : user._id}).populate([
            {path : 'author'}, 
            {path: "category"}, 
            {path: "comments.user"}, 
            {path: "comments.answers.user"},
            {path: "likes"},
            {path: "dislikes"},
            {path: "bookmarks"},
        ]);basket
        return blogs
    }
}
const getUserBookmarkedProducts = {
    type : new GraphQLList(ProductType),
    resolve : async (_, args, context) => {
        const {req} = context;
        const user = await VerifyAccessTokenInGraphQL(req)
        const products = await ProductModel.find({bookmarks : user._id}).populate([
            {path : 'supplier'}, 
            {path: "category"},
            {path: "comments.user"},
            {path: "comments.answers.user"},
            {path: "likes"},
            {path: "dislikes"},
            {path: "bookmarks"},
        ]);
        return products
    }
}
const getUserBookmarkedCourses = {
    type : new GraphQLList(CourseType),
    resolve : async (_, args, context) => {
        const {req} = context;
        const user = await VerifyAccessTokenInGraphQL(req)
        const courses = await CourseModel.find({bookmarks : user._id}).populate([
            {path : 'teacher'}, 
            {path: "category"},
            {path: "comments.user"},
            {path: "likes"},
            {path: "dislikes"},
            {path: "bookmarks"},
        ]);
        return courses
    }
}
const getUserBasket = {
    type : AnyType,
    resolve : async (_, args, context) => {
        const {req} = context;
        const user = await VerifyAccessTokenInGraphQL(req)
        const userDetail = await UserModel.aggregate([
            {
                $match : { _id: user._id }
            },
            {
                $project:{ basket: 1}
            },
            {
                $lookup: {
                    from: "products",
                    localField: "basket.products.productID",
                    foreignField: "_id",
                    as: "productDetail"
                }
            },
            {
                $lookup: {
                    from: "courses",
                    localField: "basket.courses.courseID",
                    foreignField: "_id",
                    as: "courseDetail"
                }
            },
            {
                $addFields : {
                    "productDetail" : {
                        $function: {
                            body: function(productDetail, products){
                                return (productDetail.map(function(product) {
                                    return {
                                        ...product,
                                        basketcount: products.find(item => item.productID.valueOf() == product._id.valueOf()).count
                                    }
                                }))
                            },
                            args: ["$productDetail", "$basket.products"],
                            lang: "js"
                        }
                    }
                }
            }
        ]);
        return userDetail
    }
}

module.exports = {
    getUserBookmarkedBlogs,
    getUserBookmarkedCourses,
    getUserBookmarkedProducts,
    getUserBasket
}