import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RecipeRevision } from './RecipeRevision';
import { BatchIngredientUse } from './BatchIngredientUse';
import { Namespace } from './Namespace';
import { User } from './User';

@Entity()
export class Batch {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RecipeRevision, (recipeRevision) => recipeRevision.batches)
  recipeRevision: RecipeRevision;

  @ManyToOne(() => Namespace, (namespace) => namespace.batches)
  namespace: Namespace;

  @ManyToOne(() => User, (user) => user.batches)
  user: User;

  @Column({ type: 'int' })
  volume: number;

  @OneToMany(() => BatchIngredientUse, (use) => use.batch)
  ingredients: BatchIngredientUse[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
