import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { RecipeRevision } from './RecipeRevision';

@Entity()
export class Batch {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RecipeRevision, (recipeRevision) => recipeRevision.batches)
  recipeRevision: RecipeRevision;

  @ManyToOne(() => User, (user) => user.batches)
  user: User;

  @Column({ type: 'int' })
  volume: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
