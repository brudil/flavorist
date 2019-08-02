import { Resolvers } from '../../generated/graphql';

export const userQuery: Resolvers = {
  Query: {
    viewer: async (
      _parent,
      _,
      {
        server: {
          request: { auth },
        },
      },
    ) => {
      return auth.credentials;
    },
  },
  User: {},
};
