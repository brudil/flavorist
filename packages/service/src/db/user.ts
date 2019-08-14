import { User } from '../model/User';
import { transaction } from 'objection';
import { Namespace, NamespaceType } from '../model/Namespace';
import argon2 from 'argon2';
import {
  EmailAddressStatus,
  UserEmailAddress,
} from '../model/UserEmailAddress';
import { ID } from '../model/Base';
import { Team } from '../model/Team';

export const hashPassword = async (password: string) => {
  return await argon2.hash(password);
};

export const authenticate = async (
  perhapsPassword: string,
  currentHash: string,
): Promise<boolean> => {
  try {
    return await argon2.verify(currentHash, perhapsPassword);
  } catch (e) {
    return false;
  }
};

export async function createUser(
  username: string,
  password: string,
  emailAddress: string,
) {
  return await transaction(User.knex(), async (trx) => {
    const namespace = await Namespace.query(trx).insert({
      name: username,
      type: NamespaceType.User,
    });
    const user = await User.query(trx).insert({
      namespaceId: namespace.id,
      passwordHash: await hashPassword(password),
    });
    const firstEmail = await UserEmailAddress.query(trx).insert({
      emailAddress,
      userId: user.id,
      status: EmailAddressStatus.Unverified,
    });

    return await User.query(trx).patchAndFetchById(user.id, {
      primaryEmailAddressId: firstEmail.id,
    });
  });
}

export async function findUserByEmailAddress(emailAddress: string) {
  const emailAddressEntry = await UserEmailAddress.query()
    .eager({ user: true })
    .findOne({ emailAddress });

  try {
    return emailAddressEntry && emailAddressEntry.user;
  } catch {
    return null;
  }
}

export async function getViewer(userId: ID) {
  return await User.query()
    .eager({ namespace: true })
    .findById(userId);
}

export async function usersById(ids: ID[]) {
  return User.query().whereIn('id', ids);
}

export async function usersByUsername(ids: ID[]) {
  return User.query().whereIn('username', ids);
}

export async function getNamespaceOwner(namespace: Namespace) {
  return namespace.type == NamespaceType.User
    ? await User.query().findOne({ namespaceId: namespace.id })
    : await Team.query().findOne({ namespaceId: namespace.id });
}
