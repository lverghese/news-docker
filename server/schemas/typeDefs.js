const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Query {
    me: User
    users: [User]
}

type User {
    _id: ID
    username: String
    email: String
    password: String
    articleCount: Int
    savedArticles: [Article]
}

<<<<<<< HEAD
type Circuit {
    _id: ID
    circuitId: String
    name: String
    exercises: [exercises]
}

type Exercise{
    _id: ID!
    name: String
    reps: Int
    
}
=======
type Article{
    articleId: String
    author: [String]
    title: String
    urlToImage: String
    description: String
    url: String
    content: String
}

>>>>>>> develop
type Auth {
    token: ID!
    user: User
}

input articleInput{
    articleId: String
    author: [String]
    title: String
    description: String
    urlToImage: String
    url: String
    content: String
}

type Mutation{
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveArticle(input: articleInput!): User
    removeArticle(articleId: String): User
} 
`;
//  https://egghead.io/lessons/apollo-wrap-graphql-mutation-arguments-with-a-graphql-input-type
module.exports = typeDefs;
<<<<<<< HEAD
=======
//   
>>>>>>> develop
