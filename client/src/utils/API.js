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
      body: JSON.stringify(userData),
    });
  };
  
  //save article data to user obj
export const saveArticle = (articleData, token) => {
    return fetch('/api/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
         authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(articleData),
     
    });
    console.log(articleData);
  };

  //remove saved article from user's dashboard
export const deleteBook = (articleId, token) => {
    return fetch(`/api/users/articles/${articleId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };

  // make a search to news api
  //ie:
// https://newsapi.org/v2/everything?q=bitcoin
export const searchArticles= (query) => {
    return fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=9255ed7cf0eb474d9f5426d4fece447e`);
};
