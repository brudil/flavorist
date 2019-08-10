import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RecipeRevision } from './RecipeRevision';
import { Namespace } from './Namespace';
import { User } from './User';
import { Discussion } from './Discussion';

enum RecipeVisibility {
  Public = 'PUBLIC',
  Secret = 'SECRET',
  Private = 'PRIVATE',
}

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Namespace, (namespace) => namespace.recipes)
  namespace: Namespace;

  @ManyToOne(() => User)
  createdBy: User;

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Discussion)
  @JoinColumn()
  publicDiscussion: number;
}
