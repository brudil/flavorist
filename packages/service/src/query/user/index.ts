import { Resolvers } from '../../generated/graphql';

export const userQuery: Resolvers = {
  Query: {
    viewer: async (
      _parent,
      _,
      {
        server,
        server: {
          request: { auth },
        },
      },
    ) => {
      console.log(server);
      return auth.credentials;
    },
  },
  User: {
    id(user) {
      return user.id.toString();
    },
  },
};
