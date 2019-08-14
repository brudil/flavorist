import { BaseModel, ID } from './Base';
import { IsEmail } from 'class-validator';
import { User } from './User';
import { Model } from 'objection';

export enum EmailAddressStatus {
  Unverified = 'UNVERIFIED',
  Verified = 'VERIFIED',
}

export class UserEmailAddress extends BaseModel {
  static get tableName() {
    return 'userEmailAddress';
  }

  @IsEmail()
  emailAddress: string;

  userId: ID;
  user: User;

  status: EmailAddressStatus;

  static get relationMappings() {
    return {
      primaryAddressForUser: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'namespace.id',
          to: 'user.primaryEmailAddressId',
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'userEmailAddress.userId',
          to: 'user.id',
        },
      },
    };
  }
}
