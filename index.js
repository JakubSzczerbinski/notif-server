
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const models = require('./models');

// Construct a schema, using GraphQL schema language

const Op = models.Sequelize.Op;

var schema = buildSchema(`
  type Notification {
    id: Int!
    title: String!
    subtitle: String!
    valid : Boolean!
    source: String!
    data: String!
  }
  type Event
  {
    id: Int!
    name: String!
    startTime: String!
    endTime: String!
    location: String!
    data: String!
  }
  type Query {
    allValidNotifs : [Notification!]!
    allNotifs : [Notification!]!
    notif(id: Int!) : Notification!
    event(id: Int!) : Event!
    eventsFrom(from : String!, limit: Int!) : [Event!]!
  }
  type Mutation {
    addEvent(name : String!, startTime: String!, endTime: String!, location: String!) : Event!
    addNotif(title : String!, subtitle : String!, valid : Boolean!, data: String!, source: String!): Notification!
    invalidateNotif(id : Int!) : Notification!
  }
`);

// The root provides a resolver function for each API endpoint

var root = {
  notif : ({id}) => models.Notification.findOne({ where: { id : id } }),
  allNotifs : () => models.Notification.findAll(),
  addNotif: (args) => {
    delete args.id;
    return models.Notification.create(args);
  },
  allValidNotifs : () => models.Notification.findAll({where: { valid: true }}),
  invalidateNotif : ({id}) => {
    return models.Notification.update({valid : false}, { where: { id : id }, returning: true})
      .then((model, created) => {
      	return model[1][0].dataValues;
      });
  },
  event : ({id}) => models.Event.findOne({ where: { id : id }}),
  eventsFrom : ({from, limit}) => models.Event.findAll(
    {where: { startTime: { [Op.gt] : from }}, limit: limit}),
  addEvent : (args) => models.Event.create(args)
};



var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');

