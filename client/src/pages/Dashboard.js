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
        console.log(userData);
      //accepts article index as id 
    const handleDeleteArticle = async (articleId) => {
      const token = Auth.loggedIn() ? Auth.getToken() : null;

      if (!token) {
        return false;
      }

      try {
        await removeArticle({
          variables: { articleId }
        });
        if (error){
          throw new Error('Something went wrong')
        }
        // upon success, remove article's id from localStorage
        removeArticleId(articleId);
      } catch (err) {
       console.error(err)
      }
    };

    if (loading) {
        return <h2>LOADING...</h2>;
    }

    return (
        <>
          <Jumbotron fluid className='text-light bg-dark'>
            <Container>
              <h1 className="text-center">Your Saved Articles</h1>
            </Container>
          </Jumbotron>
          <Container>
            <h2 className="text-center">
              {userData.savedArticles.length
                ? `You have ${userData.savedArticles.length} saved ${userData.savedArticles.length === 1 ? 'articles' : 'articles'}: You can delete each article after reading!`
                : 'You have no saved articles yet'}
            </h2>
            </Container>
            <CardColumns style={{margin: '25px'}}>
              {userData.savedArticles.map((article) => {
                return (
                  <Card key = {article.articleId} className="Card" border="secondary" > 
                  <Card.Title>{article.title}</Card.Title>
                  <Card.Subtitle>Written by: {article.author}</Card.Subtitle>
                  <Card.Text>{article.content}</Card.Text>
                  <Card.Link href={article.url}><Card.Img src={article.urlToImage}></Card.Img></Card.Link>
                  <h6 className="wording"> Click the picture to visit the article or Click the button to view or delete the article!</h6>
                  <Button className="btn-clicked" variant='secondary' href={article.url}>View Article!</Button>
                  <Button className='btn-clicked' variant='secondary' onClick={() => handleDeleteArticle(article.articleId)}>
                          Delete Article
                  </Button>
                    
                </Card>
                );
              })}
            </CardColumns>
          
        </>
      );
};

export default Dashboard;