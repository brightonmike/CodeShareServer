const { AuthenticationError } = require('apollo-server');

const getSnippets = require('../model/get-snippets');
const getSnippet = require('../model/get-snippet');
const addSnippet = require('../model/add-snippet');

const getGroups = require('../model/get-groups');
const getGroup = require('../model/get-group');
const addGroup = require('../model/add-group');

const snippetResolver = {
  Query: {
    getSnippets: async (_, { filters, user }) => {
      try {
        const email = await user; // catching the reject from the user promise.

        if (filters && filters.length > 0) {
          const snippets = await getSnippets();
          return snippets.filter(snippet => {
            return snippet.languages.some(language => filters.includes(language));
          });
        }

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
    },
    getGroups: async (_, { user }) => {
      try {
        const email = await user; // catching the reject from the user promise.

        return getGroups();
      } catch(e) {
        throw new AuthenticationError('You must be logged in to do this');
      }
    },
    getGroup: async (_, { id, user }) =>  {
      try {
        const email = await user; // catching the reject from the user promise.
        return getGroup(id);
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
    },
    addGroup: async (_, { group, user }) => {
      try {
        const email = await user; // catching the reject from the user promise.
        return addGroup(group);
      } catch(e) {
        throw new AuthenticationError('You must be logged in to do this');
      }
    }
  },
};

module.exports = snippetResolver;

