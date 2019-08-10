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

      const user = await userRepo.findByUsername(username);

      if (!user) {
        throw Error('404');
      }

      return user;
    },
  },
  User: {},
};
