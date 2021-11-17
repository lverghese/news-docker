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
}`;



export const ADD_USER = gql`
mutation addUser($username: String!, $password: String!, $email: String!, $articleId: ArticleId){
    addUser(username: $username, password: $password, email: $email, articleId: $articleId ){
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
              image
              link
            }
        }  
    }
}`;

export const SAVE_ARTICLE = gql`
    mutation saveArticle($article: savedArticle){
        saveArticle(input: $article){
            _id
            username
            email
            articleCount
            savedArticles{
                articleId
                author
                title
                description
                image
                url
            }
        }
    }
`;

export const REMOVE_ARTICLE = gql`
    mutation saveArticle($articleId: ID){
        saveArticle(: $article){
            _id
            username
            email
            savedArticles{
                articleId
                author
                title
                description
                image
                url
            }
        }
    }
`;

/**        username
            email
            articleCount
            savedArticles {
              articleId
              author
              description
              title
              image
              link
            } */

