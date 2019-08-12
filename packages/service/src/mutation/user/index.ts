import { Resolvers } from '../../generated/graphql';
import { AuthenticationError } from 'apollo-server-errors';
import { createUser, findUserByEmailAddress } from '../../db/user';

export const userMutation: Resolvers = {
  Mutation: {
    async createUser(
      _parent,
      { emailAddress, username, password },
      { server: { request } },
    ) {
      try {
        const user = await createUser(username, password, emailAddress);

        console.log(request);
        request.cookieAuth.set({ id: user.id });
        return {
          viewer: user,
        };
      } catch (e) {
        console.error(e);
        throw new Error('failed to create user');
      }
    },
    async authenticateUser(
      _parent,
      { emailAddress, password },
      { server: { request } },
    ) {
      const user = await findUserByEmailAddress(emailAddress);

      if (user && (await user.authenticate(password))) {
        request.cookieAuth.set({ id: user.id });
        return {
          viewer: user,
          token: user.generateToken(),
        };
      }

      throw new AuthenticationError('credentials are incorrect');
    },
    async logout(_, _x, { server: { request } }) {
      request.cookieAuth.clear();
      return { success: true };
    },
  },
};
