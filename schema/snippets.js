const { gql } = require('apollo-server');

const snippetsSchema = gql`
    type Query {
        getSnippets(filters: [String]): [Snippet]
        getSnippet(id: String!): Snippet
        getGroups: [Group]
        getGroup(id: String!): Group
    }

    type Mutation {
        addSnippet(snippet: NewSnippet): AddSnippetResponse
        editSnippet(snippet: NewSnippet): AddSnippetResponse
        deleteSnippet(snippet: NewSnippet): AddSnippetResponse
        addGroup(group: NewGroup): NewGroupResponse
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

    type Group {
        groupTitle: String
        snippets: [String]
        _id: String!
    }

    input NewGroup {
        groupTitle: String!
        snippets: [String]
    }

    type NewGroupResponse {
        success: Boolean!
        message: String
        groupTitle: String
        snippets: [String]
        _id: String!
    }
`;

module.exports = snippetsSchema;
