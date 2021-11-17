const { gql } = require('apollo-server-express');

//plan_id?
const typeDefs = gql`
type Query {
    me: User
}

type User {
    _id: ID
    username: String
    email: String
    password: String
    articleCount: Int
    savedArticles: [Article]
}

type Article{
    _id: ID
    author: String
    title: String
    description: String
}

type Auth {
    token: ID!
    user: User
}

type savedArticle{
    articleId: String
    author: String
    title: String
    description: String
}


type Mutation{
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveArticle(input: savedArticle!): User
    removeArticle(articleId: String!): User
} 
`;

module.exports = typeDefs;
