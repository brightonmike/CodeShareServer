const { AuthenticationError } = require('apollo-server');

const getSnippets = require('../model/get-snippets');
const getSnippet = require('../model/get-snippet');
const addSnippet = require('../model/add-snippet');

const snippetResolver = {
  Query: {
    getSnippets: async (_, { user }) => {
      try {
        const email = await user; // catching the reject from the user promise.
        return getSnippets();
      } catch(e) {
        throw new AuthenticationError('You must be logged in to do this');
      }
    },
    getSnippet: async (_, { id, user }) =>  {
      try {
        const email = await user; // catching the reject from the user promise.
        return getSnippet(id);
      } catch(e) {
        throw new AuthenticationError('You must be logged in to do this');
      }
    }
  },
  Mutation: {
    addSnippet: async (_, { snippet, user }) => {
      try {
        const email = await user; // catching the reject from the user promise.
        return addSnippet(snippet);
      } catch(e) {
        throw new AuthenticationError('You must be logged in to do this');
      }
    }
  },
};

module.exports = snippetResolver;

