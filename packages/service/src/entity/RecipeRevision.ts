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
import { FlavorUse } from './FlavorUse';

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

  @OneToMany(() => FlavorUse, (use) => use.recipeRevision)
  ingredients: FlavorUse[];

  @OneToMany(() => Batch, (batch) => batch.recipeRevision)
  batches: Batch[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
