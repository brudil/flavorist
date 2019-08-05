import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Discussion } from './Discussion';
import { Vendor } from './Vendor';
import { InventoryItem } from './InventoryItem';
import { IngredientUse } from './IngredientUse';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Discussion)
  discussion: number;

  @ManyToOne(() => Vendor, (vendor) => vendor.ingredients)
  vendor: Vendor;

  @OneToMany(() => InventoryItem, (inventoryItem) => inventoryItem.ingredients)
  inventory: InventoryItem[];

  @Column()
  name: string;

  @OneToMany(() => IngredientUse, (use) => use.ingredient)
  ingredientUse: IngredientUse[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
