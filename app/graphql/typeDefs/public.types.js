const { GraphQLString, GraphQLObjectType } = require("graphql");

const AuthorType = new GraphQLObjectType({
    name: "AuthorType",
    fields: {
        _id : {type : GraphQLString},
        first_name : {type : GraphQLString},
        last_name : {type : GraphQLString},
    }
})
const CategoryType = new GraphQLObjectType({
    name: "CategoryType",
    fields: {
        _id : {type : GraphQLString},
        title : {type : GraphQLString},
    }
})

module.exports = {
    AuthorType,
    CategoryType
}