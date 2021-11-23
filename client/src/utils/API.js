require('dotenv').config()

export const getMe = (token) => {
    return fetch('/api/users/me', {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
  };

  export const createUser = (userData) => {
    return fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };
  
  export const loginUser = (userData) => {
    return fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
  };
  
  //save article data to user obj
export const saveArticle = ({articleData}, token) => {

    return fetch('/api/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
         authorization: `Bearer ${token}`,
      },
      //console.log(articleData.articleId);
      //body: JSON.stringify(articleId, title, description, url, urlToImage),
      body: JSON.stringify(articleData.articleId)
     })
  };

//remove saved article from user's dashboard
export const deleteArticle = (articleId, token) => {
    return fetch(`/api/users/articles/${articleId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      }
    });
  };

// make a search to news api
//ie:
// https://newsapi.org/v2/everything?q=bitcoin
const KEY = process.env.REACT_APP_API_KEY;

export const searchArticles= (query) => {
    return fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${KEY}`);
};

