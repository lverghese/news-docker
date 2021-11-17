//auth user dashboard with saved workouts
import React from 'react';
import { Container, CardColumns, Card, Button } from 'react-bootstrap';

//import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeArticle } from '../utils/localStorage';

import { useMutation, useQuery } from '@apollo/react-hooks';
import { REMOVE_ARTICLE } from '../utils/mutations';
import { GET_ME } from '../utils/queries';

const Dashboard = () => {
    const { loading, data } = useQuery(GET_ME);
    const [removeArticle] = useMutation(REMOVE_ARTICLE);

    //empty set if none saved
    const userData = data?.me || [];

  

    //handler for removing circuit from dashboard still incomplete
    const handleDeleteArticle = async (articleId) => {

    }

    if (loading) {
        return <h2>LOADING...</h2>;
    }

    return (
        <>
          <Jumbotron fluid className='text-light bg-dark'>
            <Container>
              <h1>Your Saved Articles</h1>
            </Container>
          </Jumbotron>
          <Container>
            <h2>
              {userData.savedArticle.length
                ? `You have ${userData.savedArticle.length} saved ${userData.savedArticles.length === 1 ? 'articles' : 'articles'}: left to complete!`
                : 'You have no saved articles yet'}
            </h2>
            <CardColumns>
              {userData.savedArticles.map((article) => {
                return (
                    <Card key = {article.articleId}>
                       {article.image ? <Card.Img src={article.image} alt={`The cover for ${article.title}`} variant='top' /> : null}
                    <Card.Body>
                        <Card.Title>{article.name}</Card.Title>
                    </Card.Body>
                    <Card.Text>
                        {article.map((article) => {
                            return(
                              <div>
                                <p>{article.title} </p>
                                <p>{article.author} </p>
                                <p>{article.description} </p>
                                <p>{article.title} </p>

                              </div>
                                
                            );
                           
                        })}
                    </Card.Text>
                </Card>
                );
              })}
            </CardColumns>
          </Container>
        </>
      );
};

export const Dashboard;
