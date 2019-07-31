import { Resolvers } from '../../generated/graphql';
import { getCustomRepository, getRepository } from 'typeorm';
import { User, UserRepository } from '../../entity/User';
import { UserEmailAddress } from '../../entity/UserEmailAddress';

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
          code: '200',
          success: true,
          viewer: user,
          message: '',
        };
      } catch (e) {
        return {
          code: '400',
          success: false,
          viewer: null,
          message: '',
        };
      }
    },
    async authenticateUser(
      _parent,
      { emailAddress, password },
      { server: { request } },
    ) {
      const userRepo = getCustomRepository(UserRepository);
      const user = await userRepo.findByEmailAdderss(emailAddress);

      if (user && (await user.authenticate(password))) {
        console.log(request);
        request.cookieAuth.set({ id: user.id });
        return {
          code: '200',
          message: '',
          success: true,
          viewer: user,
          token: user.generateToken(),
        };
      }

      return {
        code: '400',
        success: false,
        message: 'Failed to log in user',
      };
    },
    async logout(_, _x, { server: { request } }) {
      request.cookieAuth.clear();
      return {
        code: '200',
        success: true,
        message: '',
      };
    },
  },
};
