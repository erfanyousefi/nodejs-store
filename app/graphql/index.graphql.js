const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { BlogResolver } = require("./queries/blog.resolver");
const { ProductResolver } = require("./queries/product.resolver");
//query, mutation, schema, types
const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields : {
        blogs : BlogResolver,
        products: ProductResolver
    }
})
const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {

    }
})
const graphQLSchema = new GraphQLSchema({
    query: RootQuery,
    // mutation: RootMutation
})
module.exports =  {
    graphQLSchema
}