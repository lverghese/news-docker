import gql from 'graphql-tag';

export const GET_ME = gql`
{
    me {
        _id
        username
        email
        password
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
