const { gql } = require('apollo-server-express');

//plan_id?
const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    password: String
    savedCircuits: [Circuit]
}

type Article{
    _id: ID
    author: String
    title: String
    description: String
}

type savedArticle{
    articleId: String
    author: String
    title: String
    description: String
}

type Auth {
    token: ID!
    user: User
}

type Mutation{
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveArticle(input: savedArticle!): User
    removeArticle(articleId: String!): User
} 
`;

module.exports = typeDefs;
