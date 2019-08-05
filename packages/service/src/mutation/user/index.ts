import { Resolvers } from '../../generated/graphql';
import { getCustomRepository, getRepository } from 'typeorm';
import { User, UserRepository } from '../../entity/User';
import { UserEmailAddress } from '../../entity/UserEmailAddress';
import { AuthenticationError } from 'apollo-server-errors';

export const userMutation: Resolvers = {
  Mutation: {
    async createUser(
      _parent,
      { emailAddress, username, password },
      { server: request },
    ) {
      try {
        const userRepo = getCustomRepository(UserRepository);
        const emailRepo = getRepository(UserEmailAddress);

        // create user
        const user = new User();
        user.username = username;
        await user.setPassword(password);
        await userRepo.save(user);

        // create email entry
        const email = new UserEmailAddress();
        email.emailAddress = emailAddress;
        email.user = user;
        await emailRepo.save(email);

        // add email to user
        user.primaryEmailAddress = email;
        await userRepo.save(user);

        request.cookieAuth.set({ id: user.id });
        return {
          viewer: user,
        };
      } catch (e) {
        throw new Error('failed to create user');
      }
    },
    async authenticateUser(
      _parent,
      { emailAddress, password },
      { server: { request } },
    ) {
      const userRepo = getCustomRepository(UserRepository);
      const user = await userRepo.findByEmailAddress(emailAddress);

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
