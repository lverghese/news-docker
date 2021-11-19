//dashboard displaying possible workouts to browze  
//option to select only if logged in
// import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearchengin} from '@fortawesome/free-brands-svg-icons'

// import * as Fa from '@fortawesome/react-fontawesome' 
import { MDBCol } from "mdbreact";
import React, { useEffect, useState } from "react";
import {  Container, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/Auth';
import { useMutation } from '@apollo/react-hooks';
import { GET_ME } from '../utils/queries';
import { SAVE_ARTICLE } from "../utils/mutations";
import { saveArticleIds, getSavedArticleIds } from "../utils/localStorage";
import { searchArticles } from '../utils/API';
const Home = () => {
//create state to hold articles from api data
    const [displayArticles, setDisplayArticles] =  useState([]);
    //search initially empty
    const [searchInput, setSearchInput] = useState('');
    const [savedArticleIds, setSavedArticleIds] = useState(getSavedArticleIds());
    const [saveArticle, { error }] = useMutation(SAVE_ARTICLE);
    // set up useEffect hook to save `savedarticles` 
    //list to localStorage on component unmount too keep pwa functionality
//possible to set unmount to after 2 weeks of no use?
    //method to display api data 

    useEffect(() => {
        return () => saveArticleIds(savedArticleIds);
    });

 //called onclick of save this article btn
 const handleSaveArticle= async(articleId) => {
    const articleToSave = displayArticles.find((article) => article.articleId === articleId);
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if(!token){
        return false;
    }

    try {
       const { data } = await saveArticle({
           variables: {input: articleToSave}
       });
       if(error){
        throw new Error('something went wrong!');
       }
             // if book successfully saves to user's account, save book id to state
      setSavedArticleIds([...savedArticleIds, articleToSave.articleId]);
    } catch (err) {
      console.error(err);
    }
  };

    const handleShowArticles = async (event) => {
        //are we keeping the search option? if so this becomes a search btn handler 
        //could be cool to have articles populate the homepage at random for browsing until user searches for one
        event.preventDefault();


        if (!searchInput) {
            return false;
          }
      
          try {
              //response == api fetch + query
            const response = await searchArticles(searchInput);
      
            if (!response.ok) {
              throw new Error('something went wrong!');
            }
      
            const { articles } = await response.json();
    
            const articleData = articles.map((article) => ({
                articleId: article._id,
                authors: article.authors,
                title: article.title,
                description: article.description,
                link: article.infoLink,
                image: article.image,
              }))
          
              //if not search, just display a bunch of fetched articles of a certain type?
              setDisplayArticles(articleData);;
            setSearchInput('')
          } catch (err) {
            console.error(err);
          }
    };

       return (
          <>
        <Container fluid>
            <h1>Seach for an article</h1>
            
            <MDBCol md="6">
      <div className="input-group md-form form-sm form-1 pl-0">
        <div className="input-group-prepend">
          <span className="input-group-text lighten-3" id="basic-text1">
          <FontAwesomeIcon icon={faSearchengin} />
          </span>
        </div>
        <input className="form-control my-0 py-1" type="text" placeholder="Search for articles" aria-label="Search" />
      </div>
    </MDBCol>
        </Container>
        <CardColumns>
            {displayArticles.map((article) => {
                return(
                    <Card key = {article.articleId}>
                        <Card.Title>{article.title}</Card.Title>
                        <Card.Subtitle className='mb-2 text-muted'> Authors: {article.author}</Card.Subtitle>
                        <Card.Text>{article.description}</Card.Text>
                        <Card.Link href={article.url}>{article.url}</Card.Link>
                    </Card>
                );
            })}
        </CardColumns>
        </>
      )
};

export default Home;

