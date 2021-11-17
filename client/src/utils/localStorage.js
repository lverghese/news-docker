export const getSavedArticleId = () => {
    const savedArticleId= localStorage.getItem('saved_articles')
      ? JSON.parse(localStorage.getItem('saved_articles'))
      : [];
    return savedArticleId;
  };

  export const saveArticleId = (articleArr) => {
    if (articleArr.length) {
      localStorage.setItem('saved_articles', JSON.stringify(articleArr));
    } else {
      localStorage.removeItem('saved_articles');
    }
  };

  export const removeArticle = (articleId) => {
    const savedArticles = localStorage.getItem('saved_articles')
    ? JSON.parse(localStorage.getItem('saved_articles'))
    :null;
    if(!savedArticles){
      return false;
    };

    const updatedSavedArticles = saveArticleId?.filter((savedArticleId) => savedArticles != articleId)
    localStorage.setItem('saved_article', JSON.stringify(updatedSavedArticles));
    return true;
  };