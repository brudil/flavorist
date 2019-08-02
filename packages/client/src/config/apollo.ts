import { createHttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';

export async function setupApolloClient() {
  const link = createHttpLink({
    uri: '/graphql',
    credentials: 'same-origin',
  });

  const cache = new InMemoryCache({
    dataIdFromObject: (object) => object.id,
  });

  await persistCache({
    cache,
    storage: window.localStorage as any,
  });

  return new ApolloClient({
    cache,
    link,
  });
}
