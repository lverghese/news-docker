import gql from 'graphql-tag';

export const GET_ME = gql`
{
    me {
        _id
        username
        email
        password
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
