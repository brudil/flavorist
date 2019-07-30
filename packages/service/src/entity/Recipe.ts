import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { RecipeRevision } from './RecipeRevision';

enum RecipeVisibility {
  Public = 'PUBLIC',
  Secret = 'SECRET',
  Private = 'PRIVATE',
}

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.recipes)
  user: User;

  @Column()
  totalRevisions: number;

  @OneToMany(() => RecipeRevision, (recipeRevision) => recipeRevision.recipe)
  revisions: RecipeRevision[];

  @ManyToOne(() => Recipe, (recipe) => recipe.remixes)
  remixOf: Recipe;

  @OneToMany(() => Recipe, (recipe) => recipe.remixOf)
  remixes: Recipe[];

  @Column()
  secretAccess: string;

  @Column({
    type: 'enum',
    enum: RecipeVisibility,
    default: RecipeVisibility.Private,
  })
  visibility: RecipeVisibility;
}
