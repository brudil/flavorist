import { Resolvers } from '../../generated/graphql';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../../entity/User';

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
    user: async (_parent, { username }) => {
      const userRepo = getCustomRepository(UserRepository);

      return (await userRepo.findByUsername(username)) || null;
    },
  },
  User: {},
};
