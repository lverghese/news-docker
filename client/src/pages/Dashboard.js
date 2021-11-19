//auth user dashboard with saved workouts
import React from 'react';
import { Container, CardColumns, Card, Button, Jumbotron } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


//import { getMe, deleteArticle } from '../utils/API';
import Auth from '../utils/Auth';
import { removeArticleId } from '../utils/localStorage';

import { useMutation, useQuery } from '@apollo/react-hooks';
import { REMOVE_ARTICLE } from '../utils/mutations';
import { GET_ME } from '../utils/queries';

const Dashboard = () => {
    const { loading, data } = useQuery(GET_ME);
    const [removeArticle, { error }] = useMutation(REMOVE_ARTICLE);

    //empty set if none saved
    const userData = data?.me || [];

  

      // create function that accepts the book's mongo _id value as param and deletes the book from the database
    const handleDeleteArticle = async (articleId) => {
      const token = Auth.loggedIn() ? Auth.getToken() : null;

      if (!token) {
        return false;
      }

      try {
        await removeArticle({
          variables: { articleId }
        });
        
        // upon success, remove article's id from localStorage
        removeArticleId(articleId);
      } catch (err) {
        console.error(err);
      }
    };

    if (loading) {
        return <h2>LOADING...</h2>;
    }

    return (
        <>
          <Jumbotron fluid className='text-light bg-dark'>
            <Container>
              <h1 class="display-4">Your Saved Articles</h1>
            </Container>
          </Jumbotron>
          <Container>
            <h2>
              {userData.savedArticles.length
                ? `You have ${userData.savedArticles.length} saved ${userData.savedArticles.length === 1 ? 'articles' : 'articles'}: left to complete!`
                : 'You have no saved articles yet'}
            </h2>
            <CardColumns>
              {userData.savedArticles.map((article) => {
                return (
                    <Card key = {article.articleId} style={{ width: '40rem' }}>
                       {article.image ? <Card.Img src={article.image} alt={`The cover for ${article.title}`} variant='top' /> : null}
                    <Card.Body>
                        <Card.Title>{article.title}</Card.Title>
                        <Card.Subtitle className='mb-2 text-muted'> Authors: {article.author}</Card.Subtitle>
                        <Card.Text>{article.description}</Card.Text>
                        <Card.Link href={article.url}>{article.url}</Card.Link>
                        <Button className='btn-block btn-danger' onClick={() => handleDeleteArticle(article._id)}>
                          Delete this Article!
                        </Button>
                    </Card.Body>
                </Card>
                );
              })}
            </CardColumns>
          </Container>
        </>
      );
};

export default Dashboard;
