import { Resolvers } from '../../generated/graphql';
import { Namespace } from '../../model/Namespace';
import { Team } from '../../model/Team';
import { User } from '../../model/User';
import { getNamespaceOwner } from '../../db/user';

export const namespaceQuery: Resolvers = {
  Query: {
    namespace: async (_parent, { name }) => {
      const namespace = await Namespace.query().findOne({ name });

      if (!namespace) {
        throw Error('404');
      }

      return namespace;
    },
  },
  Namespace: {
    owner: async (entity: Namespace) => {
      const owner = await getNamespaceOwner(entity);

      if (!owner) {
        throw new Error('missing owner');
      }

      return owner;
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
