import gql from 'graphql-tag';

//witholding all !required
export const lOGIN_USER = gql`
mutation loginUser($email: String!, $password: String!){
    login(email: $email, password: $password){
        token
        user{
            _id
            
        }
    }
}`;
//username

export const ADD_USER = gql`
mutation addUser($username: String!, $password: String!, $email: String!, $planId: PlanId){
    addUser(username: $username, password: $password, email: $email, planId: $planId ){
        token
        user {
            _id
            username
            email
            planId
        }   
    }
}`;

export const SAVE_CIRCUIT = gql`
    mutation saveCircuit($curcuit: savedCircuit){
        saveCircuit(input: $circuit){
            _id
            username
            email
            savedCircuits{
                circuitId
                name
                exercises
        }
        }
    }
`;

export const REMOVE_CIRCUIT = gql`
    mutation saveCircuit($curcuitId: ID){
        saveCircuit(: $circuit){
            _id
            username
            email
            savedCircuits{
                circuitId
                name
                exercises
        }
        }
    }
`;