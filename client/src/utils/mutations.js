import gql from 'graphql-tag';

//witholding all !required
export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!){
    login(email: $email, password: $password){
        token
        user {
            _id
          }
    }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $password: String!, $email: String!){
    addUser(username: $username, password: $password, email: $email){
        token
        user {
            _id
            username
            email
            articleCount
            savedArticles {
                _id
                authors
                description
                title
                urlToImage
                url
              }
        }  
    }
}
`;

export const SAVE_ARTICLE = gql`
mutation saveArticle($input: articleInput!){
    saveArticle(input: $input){
            _id
            authors
            title
            description
            urlToImage
            url
        
        }
}
`;

export const REMOVE_ARTICLE = gql`
    mutation removeArticle($_id: String){
        removeArticle(_id: $_id){
            _id
            username
            email
            articleCount
            savedArticles{
                _id
                authors
                title
                description
                urlToImage
                url
            }
        }
    }
`;


