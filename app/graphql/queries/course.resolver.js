const { GraphQLList, GraphQLString } = require("graphql")
const { BlogModel } = require("../../models/blogs");
const { CourseModel } = require("../../models/course");
const { BlogType } = require("../typeDefs/blog.type");
const { CourseType } = require("../typeDefs/course.type");

const CourseResolver = {
    type : new GraphQLList(CourseType),
    args : {
        category : {type : GraphQLString}
    },
    resolve : async (_, args) => {
        const {category} = args
        const findQuery = category? {category} : {}
        return await CourseModel.find(findQuery).populate([{path : 'teacher'}, {path: "category"}]);
    }
}
module.exports = {
    CourseResolver
}