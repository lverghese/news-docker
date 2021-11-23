//dashboard displaying possible workouts to browze  
//option to select only if logged in
// import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearchengin} from '@fortawesome/free-brands-svg-icons'
import uniqid from 'uniqid';
// import * as Fa from '@fortawesome/react-fontawesome' 
//import * as FaIcons from 'react-icons/fa';

import {  Container, Card, CardColumns, Form, Button, Col } from 'react-bootstrap';
import { MDBCol } from "mdbreact";
import React, { useEffect, useState } from "react";
import CardBox from '../components/CardBox';
import Auth from '../utils/Auth';
import { useMutation } from '@apollo/react-hooks';
import { GET_ME } from '../utils/queries';
import { SAVE_ARTICLE } from "../utils/mutations";
import { saveArticleIds, getSavedArticleIds } from "../utils/localStorage";
import { searchArticles } from '../utils/API';
import { UniqueDirectiveNamesRule } from 'graphql';
import { removeArgumentsFromDocument } from '@apollo/client/utilities';
var randomWords = require('random-words');

const Home = () => {
//create state to hold articles from api data

    //search initially empty
    const [searchInput, setSearchInput] = useState(randomWords());
    const [displayArticles, setDisplayArticles] =  useState([]);
    const [savedArticleIds, setSavedArticleIds] = useState(getSavedArticleIds());
    const [saveArticle, { error }] = useMutation(SAVE_ARTICLE);
    
    //set up useEffect hook to save `savedarticles` 
    //list to localStorage on component unmount too keep pwa functionality
//possible to set unmount to after 2 weeks of no use?
    //method to display api data 

    useEffect(() => {
        return () => saveArticleIds(savedArticleIds);
    });
    
    //on page load, set handleShowArticles
    window.onload = function(){
      document.getElementById('form-btn').click();
    };

 //called onclick of save this article btn
 const handleSaveArticle= async(articleId) => {
    console.log(articleId);
    const articleToSave = displayArticles.find((article) => article.articleId === articleId);
   
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if(!token){
        return false;
    }

    try {
      console.log(articleToSave);
      //when i give the articletosave to savearticle() it dumps the articleid to null
      //wai?
       const { data } = await saveArticle({ 
           variables: {input: articleToSave}
       });
       console.log(data);
       if(error){
        throw new Error('something went wrong!');
       }
             // if article  saves to useraccount save id to state
      setSavedArticleIds([...savedArticleIds, articleToSave.articleId]);
    } catch (err) {
      console.error(err);
    }
  };

    const handleShowArticles = async (event) => {
        //HERE we need to initialize the unique ID for each rendered article
        event.preventDefault();


        if (!searchInput) {
          
          //setSearchInput(randomWords())
            return false;
          }
      
          try {
              //response == api fetch + query
            const response = await searchArticles(searchInput);
      
            if (!response.ok) {
              throw new Error('something went wrong!');
            }
      
            const { articles } = await response.json();
            console.log(articles);
            const articleData = articles.map((article) => ({
                articleId: uniqid(),
                author: article.author,
                title: article.title,
                description: article.description,
                url: article.url,
                urlToImage: article.urlToImage,
                content: article.content
              }))
          
              //if not search, just display a bunch of fetched articles of a certain type?
              setDisplayArticles(articleData);
              //setSearchInput('');
          } catch (err) {
            console.error(err);
          }
    };

       return (
          <>
      <Container>
          <h1 className="text-center text-dark">Finding articles on "{searchInput}" for you!</h1>
          <Form onSubmit={handleShowArticles}>
            <Form.Row>
              <Col xs={12} md={11}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for an article!'
                  
                />
              </Col>
              <Col xs={12} md={1}>
                <Button type='submit' variant='dark' size='lg' id='form-btn'>
                  Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
        <CardColumns>
            {displayArticles.map((article) => {
                return(
                    <Card key = {article.articleId}>
                        <Card.Title>{article.title}</Card.Title>
                        <Card.Subtitle className='mb-2 text-muted'> Author(s): {article.author}</Card.Subtitle>
                        <Card.Text>{article.description}</Card.Text>
                        <Card.Link href={article.url}>{article.url}</Card.Link>
                        {Auth.loggedIn() && (
                    <Button
                      disabled={savedArticleIds?.some((savedArticleId) => savedArticleId === article.articleId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveArticle(article.articleId)}>
                      {savedArticleIds?.some((savedArticleId) => savedArticleId === article.articleId)
                        ? 'Article saved to dashboard!'
                        : 'Save Article!'}
                    </Button>
                  )}
                    </Card>
                );
            })}
        </CardColumns>
        </>
      )
};

export default Home;

