export const getSavedArticleIds = () => {
    const savedArticleIds= localStorage.getItem('saved_articles')
      ? JSON.parse(localStorage.getItem('saved_articles'))
      : [];
    return savedArticleIds;
  };

  export const saveArticleIds = (articleIdArr) => {
    if (articleIdArr.length) {
      localStorage.setItem('saved_articles', JSON.stringify(articleIdArr));
    } else {
      localStorage.removeItem('saved_articles');
    }
  };

  export const removeArticleId = (articleId) => {
    const savedArticlesIds = localStorage.getItem('saved_articles')
    ? JSON.parse(localStorage.getItem('saved_articles'))
    :null;
    if(!savedArticlesIds){
      return false;
  };

    //extracting articleId for refernce in dashboard
    const updatedSavedArticlesIds = saveArticleIds?.filter((savedArticleId) => savedArticleId !== articleId)
    localStorage.setItem('saved_article', JSON.stringify(updatedSavedArticlesIds));
    return true;
  };