import { BaseModel } from './Base';
import { Namespace } from './Namespace';

export class Follower extends BaseModel {
  static get tableName() {
    return 'follower';
  }

  user: Namespace;
  follower: Namespace;
  createdAt: Date;
}
