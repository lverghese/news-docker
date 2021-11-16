import gql from 'graphql-tag';

export const GET_ME = gql`
{
    me {
        _id
        username
        email
        password
        savedCircuits {
            _id
            circuitId
            name
            exercises{
                _id
                name
                reps
            }
        }
    }
}
`;
