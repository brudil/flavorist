import { Resolvers } from '../../generated/graphql';
import { User } from '../../model/User';
import { getTeamsForUser } from '../../db/teams';

export const userQuery: Resolvers = {
  Query: {
    viewer: async (_parent, _, { auth }) => {
      return auth;
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
