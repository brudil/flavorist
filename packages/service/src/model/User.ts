import { BaseModel, ID } from './Base';
import { IsString } from 'class-validator';
import { Namespace } from './Namespace';
import { UserEmailAddress } from './UserEmailAddress';
import { Model } from 'objection';

export class User extends BaseModel {
  static get tableName() {
    return 'user';
  }

  @IsString()
  displayName: string;

  @IsString()
  passwordHash: string;

  namespaceId: ID;
  namespace: Namespace;

  primaryEmailAddressId: ID;
  primaryEmailAddress: UserEmailAddress;

  static get relationMappings() {
    return {
      namespace: {
        relation: Model.BelongsToOneRelation,
        modelClass: Namespace,
        join: {
          from: 'user.namespaceId',
          to: 'namespace.id',
        },
      },
      primaryEmailAddress: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserEmailAddress,
        join: {
          from: 'user.primaryEmailAddressId',
          to: 'userEmailAddress.id',
        },
      },
      emailAddresses: {
        relation: Model.HasManyRelation,
        modelClass: UserEmailAddress,
        join: {
          from: 'user.id',
          to: 'userEmailAddress.userId',
        },
      },
    };
  }
}
