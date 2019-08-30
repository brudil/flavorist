import { Resolvers } from '../../generated/graphql';
import { AuthenticationError } from 'apollo-server-errors';
import {
  createUser,
  findUserByEmailAddress,
  authenticate,
  getViewer,
} from '../../db/user';

export const userMutation: Resolvers = {
  Mutation: {
    async createUser(
      _parent,
      { emailAddress, username, password },
      { request },
    ) {
      try {
        const user = await createUser(username, password, emailAddress);

        console.log(user);
        request.cookieAuth.set({ id: user!.id });
        return {
          viewer: await getViewer(user!.id),
        };
      } catch (e) {
        console.error(e);
        throw new Error('failed to create user');
      }
    },
    async authenticateUser(_parent, { emailAddress, password }, { request }) {
      const user = await findUserByEmailAddress(emailAddress);

      if (user && (await authenticate(password, user.passwordHash))) {
        request.cookieAuth.set({ id: user.id });
        return {
          viewer: user,
        };
      }

      throw new AuthenticationError('credentials are incorrect');
    },
    async logout(_, _x, { request }) {
      request.cookieAuth.clear();
      return { success: true };
    },
  },
};
