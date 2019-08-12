import { Resolvers } from '../../generated/graphql';
import { User } from '../../entity/User';
import { getTeamsForUser } from '../../db/teams';

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
  User: {
    teamsConnection: async (parent: User) => {
      const teams = await getTeamsForUser(parent);
      console.log(teams);

      return {
        pageInfo: null as any,
      };
    },
  },
};
