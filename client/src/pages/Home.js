//dashboard displaying possible workouts to browze  
//option to select only if logged in
import React, { useEffect, useState } from "react";
import {  Container, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/Auth';
import { useMutation } from '@apollo/react-hooks';
import { GET_ME } from '../utils/queries';
import { SAVE_ARTICLE } from "../utils/mutations";
import { saveArticleId, getSavedArticleId } from "../utils/localStorage";

const Home = () => {
//create state to hold articles from api data
    const [displayArticles, setDisplayArticles] =  useState([]);

    const [savedArticleIds, setSavedArticleIds] = useState(getSavedArticleId());
    const [saveArticle] = useMutation(SAVE_ARTICLE);
    // set up useEffect hook to save `savedarticles` 
    //list to localStorage on component unmount too keep pwa functionality
//possible to set unmount to after 2 weeks of no use?
    //method to display api data 

    useEffect(() => {
        return () => saveArticleId(savedArticleIds);
    });
    setDisplayArticles(articleData);

      const handleSaveArticle= async(articleId) => {
          const articleToSave = displayArticles.find((article) => article.articleId === articleId);
          const token = Auth.loggedIn() ? Auth.getToken() : null;
          if(!token){
              return false;
          }

          try {
              await saveArticle({
                  variables: {article: articleToSave},
                  /**ref booksearch fot  this cache part */
                  update: cache => {
                    const {me} = cache.readQuery({ query: GET_ME });
                   // cache.writeQuery({data: { me: { ...me, savedBooks: [...me.savedBooks, bookToSave]});
                  }
              }),
              setSavedArticleIds([ ...savedArticleIds, articleToSave.articleId]);
          } catch(err){
              console.log(err);
          }
      };

      return (
          <>
        <Container>
            <h1>Select any article to save to your dashbaord!</h1>
        </Container>
        <CardColumns>
            {articles.map((article) => {
                return(
                    <Card key = {article.articleId}>
                        <Card.Body>
                            <Card.Title>{article.title}</Card.Title>
                        </Card.Body>
                        <Card.Text>
                                {article.description}
                        </Card.Text>
                    </Card>
                );
            })}
        </CardColumns>
        </>
      )
};

export default Home;

