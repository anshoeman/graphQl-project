const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
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
/*mutations*/
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addClient: {
      /*what we want to create*/
      type: clientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone:{type: GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone:args.phone
        })
      return client.save()
      }
    },
    /*Delete Client*/
    deleteClient: {
      type: clientType,
      args: {
        id: {
          type:GraphQLNonNull(GraphQLID)
        }
      }
    }
  }
})
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation:mutation
});
