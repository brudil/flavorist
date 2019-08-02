import React from 'react';
import { createHttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { FlavoristApp } from './FlavoristApp';
import { ApolloProvider } from '@apollo/react-hooks';
import { AppCrashErrorBoundary } from '../components/AppCrashErrorBoundary';
import { Global } from '@emotion/core';

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
      <Global
        styles={{
          body: {
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
          },
        }}
      />
      <AppCrashErrorBoundary>
        <FlavoristApp />
      </AppCrashErrorBoundary>
    </ApolloProvider>
  );
};
