import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NoMatch from './pages/NoMatch';

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
          <Route exact path='/' component={Home}/>
          <Route exact path='/dashboard' component={Dashboard} />
          <Route component={NoMatch} />
        </Switch>
      </>
    </Router>
    <Footer />
    </ApolloProvider>
  );
}

export default App;
