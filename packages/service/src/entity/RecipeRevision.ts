import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Batch } from './Batch';
import { Recipe } from './Recipe';
import { RecipeIngredientUse } from './RecipeIngredientUse';
import { User } from './User';

@Entity()
export class RecipeRevision {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  revisionNumber: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.revisions)
  recipe: Recipe;

  @OneToMany(() => RecipeIngredientUse, (use) => use.recipeRevision)
  ingredients: RecipeIngredientUse[];

  @OneToMany(() => Batch, (batch) => batch.recipeRevision)
  batches: Batch[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User)
  createdBy: User;
}
