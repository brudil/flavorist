import { getConnection } from 'typeorm';
import { Discussion } from '../entity/Discussion';

export async function createDiscussion() {
  return getConnection()
    .getRepository(Discussion)
    .save({});
}
