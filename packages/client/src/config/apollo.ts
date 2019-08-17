import { createHttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { createApolloKeyMapper } from '../libs/apolloKeyMapper';
import introspectionResult from '../generated/introspection-result';

export async function setupApolloClient() {
  const keyMap = createApolloKeyMapper({
    User: [['username']],
    Recipe: [['username', 'slug']],
    Vendor: [['shortName']],
  });

  const link = createHttpLink({
    uri: '/graphql',
    credentials: 'same-origin',
  });

  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: introspectionResult,
  });

  const cache = new InMemoryCache({
    fragmentMatcher,
    dataIdFromObject: (object) => {
      return object.id;
    },
    cacheRedirects: {
      Query: {
        user(_, obj) {
          return keyMap.try(obj);
        },
        ingredient(_, args, { getCacheKey }) {
          return getCacheKey({ id: args.id, __typename: 'Ingredient' });
        },
      },
    },
  });

  keyMap.init(cache);

  if (process.env.NODE_ENV === 'production') {
    await persistCache({
      cache,
      storage: window.localStorage as any,
    });
  }

  const client = new ApolloClient({
    cache,
    link,
  });

  return client;
}
