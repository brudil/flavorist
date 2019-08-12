import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Index,
  Unique,
} from 'typeorm';
import { Namespace } from './Namespace';

@Entity()
@Unique(['user', 'follower'])
export class Follower {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Namespace, (namespace) => namespace.followers)
  @Index()
  user: Namespace;

  @ManyToOne(() => Namespace, (namespace) => namespace.following)
  @Index()
  follower: Namespace;

  @CreateDateColumn()
  createdAt: Date;
}
