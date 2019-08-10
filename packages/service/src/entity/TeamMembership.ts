import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { Team } from './Team';

export enum TeamMembershipRole {
  Owner = 1,
  Admin = 2,
  Member = 3,
}

@Entity()
export class TeamMembership {
  @PrimaryGeneratedColumn()
  id: number;

  public teamId!: number;
  public userId!: number;

  @Column({
    type: 'enum',
    enum: TeamMembershipRole,
    default: TeamMembershipRole.Member,
  })
  role: TeamMembershipRole;

  @ManyToOne(() => Team, (team) => team.teamMemberships)
  public team!: Team;

  @ManyToOne(() => User, (user) => user.teamMemberships)
  public user!: User;
}
