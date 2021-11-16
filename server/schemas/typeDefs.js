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
<<<<<<< HEAD
=======
    circuitId: String
>>>>>>> develop
    name: String
    exercises: [exercises]
}

type Exercise{
    _id: ID!
    name: String
<<<<<<< HEAD
    reps: 
=======
    reps: Int
>>>>>>> develop
    
}
type Auth {
    token: ID!
    user: User
}
<<<<<<< HEAD
`;
=======

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
>>>>>>> develop
