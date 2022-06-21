const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");
const { CommentType } = require("./comment.type");
const { UserType, PublicCategoryType } = require("./public.types");
const EpisodeTypes = new GraphQLObjectType({
    name: "EpisodeTypes",
    fields: {
        _id: {type: GraphQLString},
        title: {type : GraphQLString},
        text: {type : GraphQLString},
        type: {type : GraphQLString},
        time: {type : GraphQLString},
        videoAddress : {type : GraphQLString},
        videoURL : {type : GraphQLString}
    }
})
const ChaptersType = new GraphQLObjectType({
    name: "ChaptersType",
    fields: {
        _id: {type: GraphQLString},
        title : {type : GraphQLString},
        text : {type : GraphQLString},
        episodes : {type : new GraphQLList(EpisodeTypes)},
    }
})
const CourseType = new GraphQLObjectType({
    name: "CourseType",
    fields: {
        _id: {type: GraphQLString},
        title : {type : GraphQLString},
        short_text : {type : GraphQLString},
        text : {type : GraphQLString},
        image : {type : GraphQLString},
        imageURL : {type : GraphQLString},
        tags : {type : new GraphQLList(GraphQLString)},
        category : {type : PublicCategoryType},
        price : {type : GraphQLInt},
        discount : {type : GraphQLInt},
        count : {type : GraphQLInt},
        type : {type : GraphQLString},
        status : {type: GraphQLString},
        teacher : {type : UserType},
        chapters : {type: new GraphQLList(ChaptersType)},
        comments : {type: new GraphQLList(CommentType)},
        likes : {type: new GraphQLList(UserType)},
        dislikes : {type: new GraphQLList(UserType)},
        bookmarks : {type: new GraphQLList(UserType)}
    }
})
module.exports = {
    CourseType
}