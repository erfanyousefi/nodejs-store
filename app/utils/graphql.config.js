const { graphQLSchema } = require("../graphql/index.graphql")

function graphqlConfig(req, res){
    return {
        schema: graphQLSchema,
        graphiql: true,
        context: {req, res}
    }
}

module.exports = {
    graphqlConfig
}