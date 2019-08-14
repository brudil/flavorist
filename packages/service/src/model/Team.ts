import { Namespace } from './Namespace';
import { TeamMembership } from './TeamMembership';
import { BaseModel } from './Base';

export class Team extends BaseModel {
  static get tableName() {
    return 'team';
  }

  namespace: Namespace;

  teamMemberships!: TeamMembership[];
}
