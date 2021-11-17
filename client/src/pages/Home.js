//dashboard displaying possible workouts to browze  
//option to select only if logged in
import React, { useEffect, useState } from "react";
import {  Container, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/Auth';
import { useMutation } from '@apollo/react-hooks';
import { GET_ME } from '../utils/queries';
import { SAVE_ARTICLE } from "../utils/mutations";
import { saveArticleId, getSavedArticleId } from "../utils/localStorage";
import { searchArticles} from '../utils/API';
const Home = () => {
//create state to hold articles from api data
    const [displayArticles, setDisplayArticles] =  useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [savedArticleIds, setSavedArticleIds] = useState(getSavedArticleId());
    const [saveArticle] = useMutation(SAVE_ARTICLE);
    // set up useEffect hook to save `savedarticles` 
    //list to localStorage on component unmount too keep pwa functionality
//possible to set unmount to after 2 weeks of no use?
    //method to display api data 

    useEffect(() => {
        return () => saveArticleId(savedArticleIds);
    });

 //called onclick of save this article btn
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
        });
        setSavedArticleIds([ ...savedArticleIds, articleToSave.articleId]);
    } catch(err){
        console.log(err);
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
              //if search, need to define this function in API
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
              setDisplayArticles(articleData)
            setSearchInput('')
          } catch (err) {
            console.error(err);
          }
    };

   

       return (
          <>
        <Container>
            <h1>Select any article to save to your dashboard!</h1>
        </Container>
        <CardColumns>
            {displayArticles.articles.map((article) => {
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

