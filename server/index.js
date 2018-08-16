//========================================
//===========   DATABASE    ==============
//========================================

const Sequelize = require('sequelize');
const casual = require('casual');
const _ = require('lodash');

const db = new Sequelize('blog', null, null, {
  dialect: 'sqlite',
  storage: './db.sqlite',
});

const TodoModel = db.define('todo', {
  id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
  text: { type: Sequelize.STRING },
  completed: { type: Sequelize.BOOLEAN },
});


//create mock data with a seed, so we always get the same
casual.seed(123);
db.sync({ force: true }).then(() => {
  _.times(5, () => {
    return TodoModel.create({
      text: casual.sentence,
      completed: 0
    }).then((author) => {

    });
  });
});

const Todo = db.models.todo;


//========================================
//===========    SERVER    ===============
//========================================


const { ApolloServer, gql } = require('apollo-server');


// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
type Query {
  allTodos: [Todo]
}

type Mutation {
  addTodo(text: String): [Todo]
}

type Todo {
  id: Int
  text: String
  completed: Boolean
}
`;


// Resolvers define the technique for fetching the types in the schema.
const resolvers = {
  Query: {
    allTodos(root, args) {
      return Todo.findAll();
    }
  },
  Mutation: {
    addTodo(root, args, context, info) {

      return Todo.create({ text: args.text, completed: false}).then(todo => {
        // you can now access the newly created todo via the variable todo

        return Todo.findAll();
      })

    }
  }
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});


