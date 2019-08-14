import { Discussion } from '../model/Discussion';

export async function createDiscussion() {
  return await Discussion.query().insert({});
}
