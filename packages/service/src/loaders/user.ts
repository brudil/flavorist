import { usersById, usersByUsername } from '../db/user';
import { createEntityLoaderFactory } from './utils';
import { User } from '../model/User';
import { ID } from '../model/Base';

export const createUserLoaders = () => {
  const createUserLoader = createEntityLoaderFactory<User>();

  return {
    userById: createUserLoader<ID>(usersById, (user) => user.id),
    userByUsername: createUserLoader<string>(
      usersByUsername,
      (user) => user.namespace.name,
    ),
  };
};
