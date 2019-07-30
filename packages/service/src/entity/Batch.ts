import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
}
