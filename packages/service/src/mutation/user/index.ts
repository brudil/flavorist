import { Resolvers } from '../../generated/graphql';
import { getCustomRepository, getRepository } from 'typeorm';
import { User, UserRepository } from '../../entity/User';
import { UserEmailAddress } from '../../entity/UserEmailAddress';

export const userMutation: Resolvers = {
  Mutation: {
    async createUser(_parent, { emailAddress, password }) {
      try {
        const userRepo = getCustomRepository(UserRepository);
        const emailRepo = getRepository(UserEmailAddress);

        const user = new User();
        await userRepo.save(user);
        const email = new UserEmailAddress();
        email.emailAddress = emailAddress;
        email.user = user;
        await emailRepo.save(email);

        await user.setPassword(password);
        user.primaryEmailAddress = email;
        await userRepo.save(user);

        return {
          code: '200',
          success: true,
          user: user,
          message: '',
        };
      } catch (e) {
        return {
          code: '400',
          success: false,
          user: null,
          message: '',
        };
      }
    },
    async authenticateUser(_parent, { emailAddress, password }) {
      const userRepo = getCustomRepository(UserRepository);
      const user = await userRepo.findByEmailAdderss(emailAddress);

      if (user && (await user.authenticate(password))) {
        return {
          code: '200',
          message: '',
          success: true,
          user,
          token: user.generateToken(),
        };
      }

      return {
        code: '400',
        success: false,
        message: 'Failed to log in user',
      };
    },
  },
};
