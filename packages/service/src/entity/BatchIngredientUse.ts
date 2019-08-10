import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ingredient } from './Ingredient';
import { Batch } from './Batch';
import { IngredientLedgerEntry } from './IngredientLedgerEntry';

@Entity()
export class BatchIngredientUse {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.ingredientUse)
  ingredient: Ingredient;

  @ManyToOne(() => Batch, (batch) => batch.ingredients)
  batch: Batch;

  @OneToOne(() => IngredientLedgerEntry, (entry) => entry.use)
  ledgerEntry: IngredientLedgerEntry;

  @Column({ type: 'int' })
  percentage: number;
}
