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
import { Ingredient } from './Ingredient';
import { IngredientLedgerEntry } from './IngredientLedgerEntry';
import { Discussion } from './Discussion';
import { Namespace } from './Namespace';

@Entity()
export class InventoryItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.inventories)
  ingredient: Ingredient;

  @ManyToOne(() => Namespace, (namespace) => namespace.inventoryItems)
  namespace: Namespace;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'int' })
  currentLevelMicrolitres: number;

  @Column({ type: 'int' })
  currentLevelCost: number;

  @OneToMany(() => IngredientLedgerEntry, (entry) => entry.inventoryIngredient)
  ledgerEntries: IngredientLedgerEntry[];

  @OneToOne(() => Discussion)
  @JoinColumn()
  privateDiscussion: number;
}
