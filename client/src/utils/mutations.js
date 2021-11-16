import gql from 'graphql-tag';

export const lOGIN_USER = gql `
mutation loginUser($email: String!, $password: String!){
    login(email: $email, password: $password){
        token
        user{
            _id
            username
        }
    }
}`;

export const ADD_USER = gql`
mutation addUser($username: String!, $password: String!, $email: String!, $planId: PlanId){
    addUser(username: $username, password: $password, email: $email, planId: $planId ){
        user {
            _id
            username
            email
            planId
        }
        token
    }
}`;