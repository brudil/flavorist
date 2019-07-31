import { Resolvers } from '../../generated/graphql';

export const userQuery: Resolvers = {
  Query: {
    viewer: async (_parent, _, context) => {
      return context.user;
    },
  },
  User: {
    id(user) {
      return user.id.toString();
    },
  },
};
