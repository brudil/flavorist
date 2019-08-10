import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Namespace } from './Namespace';
import { TeamMembership } from './TeamMembership';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Namespace, (namespace) => namespace.user)
  @JoinColumn()
  namespace: Namespace;

  @OneToMany(() => TeamMembership, (membership) => membership.team)
  teamMemberships!: TeamMembership[];
}
