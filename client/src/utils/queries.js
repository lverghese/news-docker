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
            _id
            author
            title
            description
            urlToImage
            url
        }
    }
}
`;
