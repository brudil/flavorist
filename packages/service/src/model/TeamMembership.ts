import { User } from './User';
import { Team } from './Team';
import { BaseModel } from './Base';

export enum TeamMembershipRole {
  Owner = 1,
  Admin = 2,
  Member = 3,
}

export class TeamMembership extends BaseModel {
  static get tableName() {
    return 'teamMembership';
  }

  public teamId!: number;
  public userId!: number;

  role: TeamMembershipRole;

  public team!: Team;

  public user!: User;
}

// TODO: relationships
