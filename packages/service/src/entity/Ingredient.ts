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
import { Discussion } from './Discussion';
import { Vendor } from './Vendor';
import { InventoryItem } from './InventoryItem';
import { RecipeIngredientUse } from './RecipeIngredientUse';
import { BatchIngredientUse } from './BatchIngredientUse';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Discussion)
  @JoinColumn()
  publicDiscussion: number;

  @ManyToOne(() => Vendor, (vendor) => vendor.ingredients)
  vendor: Vendor;

  @OneToMany(() => InventoryItem, (inventoryItem) => inventoryItem.ingredient)
  inventories: InventoryItem[];

  @Column()
  name: string;

  @OneToMany(() => RecipeIngredientUse, (use) => use.ingredient)
  ingredientUse: RecipeIngredientUse[];

  @OneToMany(() => BatchIngredientUse, (use) => use.ingredient)
  batchUse: BatchIngredientUse[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
