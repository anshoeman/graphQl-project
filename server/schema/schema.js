const { projects, client, clients } = require("../sample.data");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");

/*
Project Type
*/
const projecType = new GraphQLObjectType({
  name: "project",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    decription: {
      type: GraphQLString,
    },
    status: {
      type: GraphQLString,
    },
    client: {
      type: clientType,
      resolve(parent, args) {
        return clients.find(
          (client) => client.id == parent.id
        ); /*parent here is project parent=project*/
      },
    },
  }),
});

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
    projects: {
      type: new GraphQLList(projecType),
      resolve(parent, args) {
        return projects;
      },
    },
    project: {
      type: projecType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(args, parent) {
        return projects.find((project) => project.id == args.id);
      },
    },
    clients: {
      type: new GraphQLList(clientType),
      resolve(parent, args) {
        return clients;
      },
    },
    client: {
      type: clientType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        /*Here we will put mongoose functions to get a single client*/
        return clients.find((client) => client.id == args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
