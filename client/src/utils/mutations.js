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
mutation saveArticle($author: String, $title: String, $articleId: String, $description: String $urlToImage: String, $url: String){
    saveArticle(author: $author, title: $title, articleId: $articleId, description: $description urlToImage: $urlToImage, url: $url){
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
          }
        }
}
`;

export const REMOVE_ARTICLE = gql`
    mutation removeArticle($ArticleId: String){
        removeArticle(ArticleId: $Int){
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
            }
        }
    }
`;


