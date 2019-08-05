import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Ingredient } from './Ingredient';
import { RecipeRevision } from './RecipeRevision';

@Entity()
export class IngredientUse {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.ingredientUse)
  ingredient: Ingredient;

  @ManyToOne(
    () => RecipeRevision,
    (recipeRevision) => recipeRevision.ingredients,
  )
  recipeRevision: RecipeRevision;

  @Column({ type: 'int' })
  percentage: number;
}
