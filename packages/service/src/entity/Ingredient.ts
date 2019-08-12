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

export enum IngredientType {
  Flavor = 1,
  Base = 2,
}

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Discussion)
  @JoinColumn()
  publicDiscussion: Discussion;

  @ManyToOne(() => Vendor, (vendor) => vendor.ingredients)
  vendor: Vendor;

  @OneToMany(() => InventoryItem, (inventoryItem) => inventoryItem.ingredient)
  inventories: InventoryItem[];

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: IngredientType,
    default: IngredientType.Flavor,
  })
  type: IngredientType;

  @OneToMany(() => RecipeIngredientUse, (use) => use.ingredient)
  ingredientUse: RecipeIngredientUse[];

  @OneToMany(() => BatchIngredientUse, (use) => use.ingredient)
  batchUse: BatchIngredientUse[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
