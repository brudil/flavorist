import React from 'react';
import { FlavoristApp } from './FlavoristApp';
import { ApolloProvider } from '@apollo/react-hooks';
import { AppCrashErrorBoundary } from '../components/AppCrashErrorBoundary';
import { Global } from '@emotion/core';
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import emotionNormalize from 'emotion-normalize';

export const ApplicationRoot: React.FC<{
  apolloClient: ApolloClient<NormalizedCacheObject>;
}> = ({ apolloClient }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <Global
        styles={[
          emotionNormalize,
          {
            body: {
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
            },
          },
        ]}
      />
      <AppCrashErrorBoundary>
        <FlavoristApp />
      </AppCrashErrorBoundary>
    </ApolloProvider>
  );
};
