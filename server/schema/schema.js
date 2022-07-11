const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLInputObjectType,
} = require("graphql");
/*
mongoose models
*/

const Project = require("../models/project");
const Client = require("../models/client");

/*
Project Type
*/
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: clientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
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
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        /*return projects*/ /*this was a fake project data that was given*/
        /*we will try to send the data or return the data from database*/
        return Project.find(); //return all the models in the database
      },
    },
    project: {
      type: ProjectType,
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
        return Client.find(); /*Send the client data*/
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
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });
        return client.save();
      },
    },
    /*Delete Client*/
    deleteClient: {
      type: clientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Client.findByIdAndRemove(args.id);
      },
    },
    /*add a project*/
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "completed" },
            },
          }),
          defaultValue: "Not Started",
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });
        return project.save();
      },
    },
    /*delete project*/
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Project.findByIdAndRemove(args.id);
      },
    },
    /*update a project*/
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
        },
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },
  },
});
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutation,
});
