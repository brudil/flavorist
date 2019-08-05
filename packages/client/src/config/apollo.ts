import { createHttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { createApolloKeyMapper } from '../libs/apolloKeyMapper';

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

  const cache = new InMemoryCache({
    dataIdFromObject: (object) => {
      return object.id;
    },
    cacheRedirects: {
      Query: {
        user(_, obj) {
          return keyMap.try(obj);
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
