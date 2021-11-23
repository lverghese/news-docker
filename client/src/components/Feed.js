import React, { Component } from 'react';
    import Pusher from 'pusher-js';
    import pushid from 'pushid';
    import './feed.css';
    require('dotenv').config({ path: '.env' });
    class Feed extends Component {
      state = {
        newsItems: [],
      }
    
      render() {
        const NewsItem = (article, id) => (
          <li key={id}><a href={`${article.url}`}>{article.title}</a></li>
        );
        
        const newsItems = this.state.newsItems.map(e => NewsItem(e, pushid()));
    
        return (
          <div className="App">
            <h1 className="App-title">Live Bitcoin Feed</h1>
    
            <ul className="news-items">{newsItems}</ul>
          </div>
        );
      }
    }
    
    export default Feed;