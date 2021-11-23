import Pusher from 'pusher-js';
import pushid from 'pushid';
  
  export const  componentDidMount =() => {
        fetch('http://localhost:3000/live')
          .then(response => response.json())
          .then(articles => {
            this.setState({
              newsItems: [...this.state.newsItems, ...articles],
            });
          }).catch(error => console.log(error));
    
        const pusher = new Pusher(process.env.PUSHER_APP_KEY, {
          cluster:  process.env.PUSHER_APP_CLUSTER,
          encrypted: true,
        });
    
        const channel = pusher.subscribe('news-channel');
        channel.bind('update-news', data => {
          this.setState({
            newsItems: [...data.articles, ...this.state.newsItems],
          });
        });
      }

     