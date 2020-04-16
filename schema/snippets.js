const { gql } = require('apollo-server');

const snippetsSchema = gql`
    type Query {
        getSnippets: [Snippet]
        getSnippet(id: String!): Snippet
    }

    type Mutation {
        addSnippet(snippet: NewSnippet): AddSnippetResponse
        editSnippet(snippet: NewSnippet): AddSnippetResponse
        deleteSnippet(snippet: NewSnippet): AddSnippetResponse
    }

    type AddSnippetResponse {
        success: Boolean!
        message: String
        title: String
        author: String
        userPicture: String
        code: String
        languages: [String]
        comments: String
        versions: [String]
        types: [String]
        _id: String!
    }

    input NewSnippet {
        title: String!
        author: String!
        userPicture: String
        languages: [String]
        comments: String
        versions: [String]
        types: [String]
        code: String!
    }

    type Snippet {
        title: String!
        author: String!
        userPicture: String
        code: String!
        languages: [String]
        comments: String
        versions: [String]
        types: [String]
        _id: String!
    }
`;

module.exports = snippetsSchema;
