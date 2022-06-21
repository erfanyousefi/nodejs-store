const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { BlogResolver } = require("./queries/blog.resolver");
const { CategoriesResolver, CategoryChildResolver } = require("./queries/category.resolver");
const { CreateCommentForBlog, CreateCommentForCourse, CreateCommentForProduct } = require("./mutations/comment.resolver");
const { LikeProduct, LikeBlog, LikeCourse } = require("./mutations/likes.resolver");
const { DisLikeProduct, DisLikeBlog, DisLikeCourse} = require("./mutations/dislikes.resolver");
const { BookmarkBlog, BookmarkCourse, BookmarkProduct} = require("./mutations/bookmarks.resolver");
const { AddCourseToBasket, AddProductToBasket, RemoveCourseFromBasket, RemoveProductFromBasket} = require("./mutations/basket.resolver");
const { getUserBookmarkedBlogs, getUserBookmarkedCourses, getUserBookmarkedProducts, getUserBasket} = require("./queries/user-profile.resolver");
const { CourseResolver } = require("./queries/course.resolver");
const { ProductResolver } = require("./queries/product.resolver");
//query, mutation, schema, types
const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields : {
        blogs : BlogResolver,
        products: ProductResolver,
        categories : CategoriesResolver,
        childOfCategory : CategoryChildResolver,
        courses : CourseResolver,
        getUserBookmarkedBlogs,
        getUserBookmarkedCourses,
        getUserBookmarkedProducts,
        getUserBasket
    }
})
// GUD
const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        CreateCommentForBlog,
        CreateCommentForCourse,
        CreateCommentForProduct,
        LikeProduct,
        LikeCourse,
        LikeBlog,
        DisLikeProduct,
        DisLikeBlog,
        DisLikeCourse,
        BookmarkBlog,
        BookmarkCourse,
        BookmarkProduct,
        AddCourseToBasket,
        AddProductToBasket,
        RemoveCourseFromBasket,
        RemoveProductFromBasket
        
    }
})
const graphQLSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})
module.exports =  {
    graphQLSchema
}