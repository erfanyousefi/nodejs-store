const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { CommentType } = require("./comment.type");
const { UserType, PublicCategoryType } = require("./public.types");

const BlogType = new GraphQLObjectType({
    name: "blogType",
    fields: {
        _id: {type: GraphQLString},
        author : {type : UserType},
        title : {type : GraphQLString},
        short_text : {type : GraphQLString},
        text : {type : GraphQLString},
        image : {type : GraphQLString},
        imageURL : {type : GraphQLString},
        tags : {type : new GraphQLList(GraphQLString)},
        category : {type : PublicCategoryType},
        comments : {type: new GraphQLList(CommentType)},
        likes : {type: new GraphQLList(UserType)},
        dislikes : {type: new GraphQLList(UserType)},
        bookmarks : {type: new GraphQLList(UserType)}
    }
})

module.exports = {
    BlogType
}