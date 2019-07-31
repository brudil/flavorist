import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Router } from '@reach/router';
import { Explore } from './Explore';
import { Home } from './Home';

import { createHttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { BatchesRoot } from './BatchesRoot';

const link = createHttpLink({
  uri: '/graphql',
  credentials: 'same-origin',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export const Application: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <React.Fragment>
        <Sidebar />
        <div>
          <Router>
            <Home path="/" />
            <Explore path="explore" />
            <BatchesRoot path="batches" />
          </Router>
        </div>
      </React.Fragment>
    </ApolloProvider>
  );
};
