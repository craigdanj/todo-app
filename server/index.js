//========================================
//===========   DATABASE    ==============
//========================================

const Sequelize = require('sequelize');
const casual = require('casual');
const _ = require('lodash');

const db = new Sequelize('blog', null, null, {
  dialect: 'sqlite',
  storage: './blog.sqlite',
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
  _.times(10, () => {
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

type Todo {
  id: Int
  text: String
  completed: Boolean
}
`;


// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    allTodos(_, args) {
      return Todo.findAll();
    }
  },
  // Todo: {
  //   (author) {
  //     return author.getPosts();
  //   }
  // },
  // Post: {
  //   author(post) {
  //     return post.getAuthor();
  //   }
  // }
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

