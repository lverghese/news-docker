import uniqid from 'uniqid';
import {  Container, Card, CardColumns, Form, Button, Col } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import Auth from '../utils/Auth';
import { useMutation } from '@apollo/react-hooks';
import { SAVE_ARTICLE } from "../utils/mutations";
import { saveArticleIds, getSavedArticleIds } from "../utils/localStorage";
import { searchArticles } from '../utils/API';
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
      <Container className="headwrap">
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
        <CardColumns style={{margin: '25px'}}>
            {displayArticles.map((article) => {
                return(
                  <Card key = {article.articleId} className="Card" border="secondary"> 
                        <Card.Title>{article.title}</Card.Title>
                        <Card.Subtitle>Written by: {article.author}</Card.Subtitle>
                        <Card.Text>{article.description}</Card.Text>
                        <Card.Link href={article.url}><Card.Img src={article.urlToImage}></Card.Img></Card.Link>
                        
            <h6 className="wording"> Click the picture to visit the article or Click the button to view or save the article!</h6>
            {/* <Card.Link >
           
            
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-book-half" viewBox="0 0 16 16" >
                <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                </svg>
                
            </Card.Link> */}
            <br></br>
            <Button className="btn-click" variant='secondary' href={article.url}>View Article</Button>
                        {Auth.loggedIn() && (
                    <Button variant='secondary'
                      disabled={savedArticleIds?.some((savedArticleId) => savedArticleId === article.articleId)}
                      className='btn-click' 
                      onClick={() => handleSaveArticle(article.articleId)}>
                      {savedArticleIds?.some((savedArticleId) => savedArticleId === article.articleId)
                        ? 'Saved Article'
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

