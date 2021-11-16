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

type Circuit {
    _id: ID
    name: String
    exercises: [exercises]
}

type Exercise{
    _id: ID!
    name: String
    reps: 
    
}
type Auth {
    token: ID!
    user: User
}
`;