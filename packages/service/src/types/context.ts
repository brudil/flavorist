import { User } from '../model/User';
import { Request } from '@hapi/hapi';
import { createLoaders } from '../loaders';

export interface Context {
  loaders: ReturnType<typeof createLoaders>; // todo
  auth: User;
  request: Request;
}
