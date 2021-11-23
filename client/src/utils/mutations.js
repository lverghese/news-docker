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
                articleId
                author
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
        username
        email
        articleCount
        savedArticles{           
            articleId
            author
            title
            description
            urlToImage
            url
            content
          }
        }
}
`;

export const REMOVE_ARTICLE = gql`
    mutation removeArticle($articleId: String){
        removeArticle(articleId: $articleId){
            _id
            username
            email
            articleCount
            savedArticles{
                articleId
                author
                title
                description
                urlToImage
                url
                content
            }
        }
    }
`;


