const { project, client } = require("../sample.data");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
} = require("graphql");

/*
Client Type
*/
const clientType = new GraphQLObjectType({
  name: "client",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    phone: {
      type: GraphQLString,
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    client: {
      type: clientType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        /*Here we will put mongoose functions to get a single client*/
        return client.find((client) => client.id == args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
