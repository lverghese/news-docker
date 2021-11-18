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

//, $articleId: articleId


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
                author
                description
                title
                image
                url
              }
        }  
    }
}`;
/**      savedArticles {
              articleId
              author
              description
              title
              image
              url
            } */

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
        removeArticle(article: $article){
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

