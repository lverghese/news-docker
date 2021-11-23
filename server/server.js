const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
const {typeDefs, resolvers} = require('./schemas');

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//========================================================//



require('dotenv').config({ path: '.env' });
    
    //const express = require('express');
    const cors = require('cors');
    const Pusher = require('pusher');
    const NewsAPI = require('newsapi');
    
    //const app = express();
    
    const pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID,
      key: process.env.PUSHER_APP_KEY,
      secret: process.env.PUSHER_APP_SECRET,
      cluster: process.env.PUSHER_APP_CLUSTER,
      encrypted: true,
    });
    
    const newsapi = new NewsAPI(process.env.NEWS_API_KEY);
    
    const fetchNews = (searchTerm, pageNum) =>
      newsapi.v2.everything({
        q: searchTerm,
        language: 'en',
        page: pageNum,
        pageSize: 5,
      });
    
    app.use(cors());
    
    function updateFeed(topic) {
      let counter = 2;
      setInterval(() => {
        fetchNews(topic, counter)
          .then(response => {
            pusher.trigger('news-channel', 'update-news', {
              articles: response.articles,
            });
            counter += 1;
          })
          .catch(error => console.log(error));
      }, 3000);
    }
    
    app.get('/live', (req, res) => {
      const topic = 'bitcoin';
      fetchNews(topic, 1)
        .then(response => {
          res.json(response.articles);
          updateFeed(topic);
        })
        .catch(error => console.log(error));
    });
    


//========================================================//
// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

 app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, '../client/build/index.html'));
 });

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});

