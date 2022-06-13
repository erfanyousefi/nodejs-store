const { GraphQLList } = require("graphql")
const { ProductModel } = require("../../models/products")
const { ProductType } = require("../typeDefs/product.type");

const ProductResolver = {
    type : new GraphQLList(ProductType),
    resolve : async () => {
        return await ProductModel.find({}).populate([{path : 'supplier'}, {path: "category"}]);
    }
}
module.exports = {
    ProductResolver
}