import React from 'react';
import { createHttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { FlavoristApp } from './FlavoristApp';
import { ApolloProvider } from '@apollo/react-hooks';

const link = createHttpLink({
  uri: '/graphql',
  credentials: 'same-origin',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export const ApplicationRoot: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <FlavoristApp />
    </ApolloProvider>
  );
};
