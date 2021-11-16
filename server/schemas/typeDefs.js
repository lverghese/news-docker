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
    circuitId: String
    name: String
    exercises: [exercises]
}

type Exercise{
    _id: ID!
    name: String
    reps: Int
    
}
type Auth {
    token: ID!
    user: User
}

savedCircuits{
    circuitId: String
    name: String
    exercises: [exercises]
}

type Mutation{
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveCircuit(input: savedCircuit!): User
    removeCircuit(circuitId: String!): User
} 
`;

module.exports = typeDefs;
