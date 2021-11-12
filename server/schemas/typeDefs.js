const { gql } = require('apollo-server-express');

//plan_id?
const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    plan_id: PlanId
}

type PlanId {
    _id: ID
    workouts: [Exercise]
}

type Exercise{
    _id: ID!
    
}`;