const { GraphQLString, GraphQLObjectType, GraphQLList, GraphQLScalarType, Kind } = require("graphql");
const { toObject, parseLiteral } = require("../utils");

const AnyType = new GraphQLScalarType({
    name: "anyType",
    parseValue : toObject,
    serialize : toObject,
    parseLiteral : parseLiteral,
})
const UserType = new GraphQLObjectType({
    name: "UserType",
    fields: {
        _id : {type : GraphQLString},
        first_name : {type : GraphQLString},
        last_name : {type : GraphQLString},
    }
})
const PublicCategoryType = new GraphQLObjectType({
    name: "PublicCategoryType",
    fields: {
        _id : {type : GraphQLString},
        title : {type : GraphQLString},
    }
})
const ResponseType = new GraphQLObjectType({
    name: "responseType",
    fields : {
        statusCode : {type: GraphQLString},
        data : {type: AnyType}
    }
})
module.exports = {
    UserType,
    PublicCategoryType,
    AnyType,
    ResponseType
}