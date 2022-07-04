const { projects, client, clients } = require("../sample.data");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");
/*
mongoose models
*/

const Project = require("../models/project");
const Client = require("../models/client");

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
        return Client.findById(parent.clientId)/*parent here is project parent=project*/
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
        /*return projects*/ /*this was a fake project data that was given*/
        /*we will try to send the data or return the data from database*/
        return Project.find(); //return all the models in the database
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
        // return projects.find((project) => project.id == args.id);
        return Project.findById(args.id);
      },
    },
    clients: {
      type: new GraphQLList(clientType),
      resolve(parent, args) {
        return Client.find();/*Send the client data*/
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
        return Client.findById(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
