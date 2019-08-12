import { Namespace, NamespaceType } from '../entity/Namespace';
import { UserEmailAddress } from '../entity/UserEmailAddress';
import { User } from '../entity/User';
import { getConnection, getRepository } from 'typeorm';

export async function createUser(
  username: string,
  password: string,
  emailAddress: string,
) {
  return await getConnection().transaction<User>(
    async (transactionalManager) => {
      // create namespace
      const namespace = new Namespace();
      namespace.name = username;
      namespace.type = NamespaceType.User;
      await transactionalManager.save(namespace);

      // create user
      const user = new User();
      user.namespace = namespace;
      await user.setPassword(password);
      await transactionalManager.save(user);

      // create email entry
      const email = new UserEmailAddress();
      email.emailAddress = emailAddress;
      email.user = user;
      await transactionalManager.save(email);

      // add email to user
      user.primaryEmailAddress = email;
      await transactionalManager.save(user);
      return user;
    },
  );
}

export async function findUserByEmailAddress(emailAddress: string) {
  const emailAddressRepo = getRepository(UserEmailAddress);
  const emailAddressEntry = await emailAddressRepo.findOne(
    { emailAddress },
    { relations: ['user', 'user.namespace'] },
  );

  try {
    return emailAddressEntry && emailAddressEntry.user;
  } catch {
    return null;
  }
}
