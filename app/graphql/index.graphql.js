const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { BlogResolver } = require("./queries/blog.resolver");
const { CategoriesResolver, CategoryChildResolver } = require("./queries/category.resolver");
const { CreateCommentForBlog, CreateCommentForCourse, CreateCommentForProduct } = require("./mutations/comment.resolver");
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
        courses : CourseResolver
    }
})
// GUD
const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        CreateCommentForBlog,
        CreateCommentForCourse,
        CreateCommentForProduct
    }
})
const graphQLSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})
module.exports =  {
    graphQLSchema
}