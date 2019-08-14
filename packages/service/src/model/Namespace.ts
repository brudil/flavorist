import { BaseModel } from './Base';
import { IsString } from 'class-validator';
import { User } from './User';
import { Team } from './Team';
import { Model } from 'objection';

export enum NamespaceType {
  User = 'user',
  Team = 'team',
}

export class Namespace extends BaseModel {
  static get tableName() {
    return 'namespace';
  }

  @IsString()
  name: string;

  type: NamespaceType;

  user?: User;
  team?: Team;

  static get relationMappings() {
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'namespace.id',
          to: 'user.namespaceId',
        },
      },
      team: {
        relation: Model.HasOneRelation,
        modelClass: Team,
        join: {
          from: 'namespace.id',
          to: 'team.namespaceId',
        },
      },
    };
  }
}
