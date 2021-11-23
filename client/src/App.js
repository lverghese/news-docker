import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import Pusher from 'pusher-js';
import pushid from 'pushid';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
require('dotenv').config({ path: '.env' });
import pusherMount from './utils/Pusher';


const client = new ApolloClient({
  request: operation => {
    const token  = localStorage.getItem('id_token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token} ` : ''
      }
    });
  },
  uri: '/graphql',
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/dashboard' component={Dashboard} />
        </Switch>
        <Feed />
      </>
    </Router>
    </ApolloProvider>
  );
}

export default App;
