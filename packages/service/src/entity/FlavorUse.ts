import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Flavor } from './Flavor';
import { RecipeRevision } from './RecipeRevision';

@Entity()
export class FlavorUse {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Flavor, (flavor) => flavor.flavorUse)
  flavor: Flavor;

  @ManyToOne(
    () => RecipeRevision,
    (recipeRevision) => recipeRevision.ingredients,
  )
  recipeRevision: RecipeRevision;
}
