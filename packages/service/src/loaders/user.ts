import { usersById, usersByUsername } from '../db/user';
import { createLoader } from './utils';

export const userLoader = createLoader({
  id: usersById,
  username: usersByUsername,
});
