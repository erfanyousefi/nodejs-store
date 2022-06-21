const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");
const { CommentType } = require("./comment.type");
const { UserType, PublicCategoryType } = require("./public.types");
const FeaturesType = new GraphQLObjectType({
    name: "features",
    fields: {
        length : {type: GraphQLString},
        height : {type: GraphQLString},
        width : {type: GraphQLString},
        weight : {type: GraphQLString},
        colors : {type: new GraphQLList(GraphQLString)},
        madein : {type: GraphQLString}
    }
})
const ProductType = new GraphQLObjectType({
    name: "ProductType",
    fields: {
        _id: {type: GraphQLString},
        title : {type : GraphQLString},
        short_text : {type : GraphQLString},
        text : {type : GraphQLString},
        images : {type : GraphQLString},
        imagesURL : {type : new GraphQLList(GraphQLString)},
        tags : {type : new GraphQLList(GraphQLString)},
        category : {type : PublicCategoryType},
        price : {type : GraphQLInt},
        discount : {type : GraphQLInt},
        count : {type : GraphQLInt},
        type : {type : GraphQLString},
        supplier : {type : UserType},
        features : {type: FeaturesType},
        comments : {type: new GraphQLList(CommentType)},
        likes : {type: new GraphQLList(UserType)},
        dislikes : {type: new GraphQLList(UserType)},
        bookmarks : {type: new GraphQLList(UserType)}
    }
})

module.exports = {
    ProductType
}