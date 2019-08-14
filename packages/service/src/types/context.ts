import { User } from '../model/User';
import { Request } from '@hapi/hapi';

export interface Context {
  loaders: any; // todo
  auth: User;
  request: Request;
}
