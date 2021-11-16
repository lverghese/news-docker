import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import Dashboard from './pages/SearchBooks';
import Home from './pages/SavedBooks';
import Navbar from './components/Navbar';

//cleint side set with jwt headers
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
      </>
    </Router>
    </ApolloProvider>
  );
}

export default App;
