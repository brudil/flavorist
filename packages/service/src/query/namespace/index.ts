import { Resolvers } from '../../generated/graphql';
import { getRepository } from 'typeorm';
import { Namespace } from '../../entity/Namespace';
import { Team } from '../../entity/Team';
import { User } from '../../entity/User';

export const namespaceQuery: Resolvers = {
  Query: {
    namespace: async (_parent, { name }) => {
      const namespaceRepo = getRepository(Namespace);

      const namespace = await namespaceRepo.findOne(
        { name },
        { relations: ['user', 'team'] },
      );

      if (!namespace) {
        throw Error('404');
      }

      return namespace;
    },
  },
  Namespace: {
    owner(entity: Namespace) {
      return entity.user || entity.team;
    },
  },
  NamespaceOwner: {
    __resolveType: async (entity: any) => {
      if (entity instanceof User) {
        return 'User';
      }

      if (entity instanceof Team) {
        return 'Team';
      }

      throw new Error('type fell through');
    },
  } as any,
};
