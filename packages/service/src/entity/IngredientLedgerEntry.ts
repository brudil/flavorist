import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BatchIngredientUse } from './BatchIngredientUse';
import { InventoryItem } from './InventoryItem';
import { User } from './User';

enum ENTRY_TYPE {
  Use = 'USE',
  Purchase = 'PURCHASE',
}

@Entity()
export class IngredientLedgerEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => InventoryItem, (item) => item.ledgerEntries)
  inventoryIngredient: InventoryItem;

  @Column({ type: 'enum', enum: ENTRY_TYPE })
  @OneToOne(() => BatchIngredientUse, (use) => use.ledgerEntry)
  @JoinTable()
  use: BatchIngredientUse;

  @Column({ type: 'int' })
  microlitres: number;

  @Column({ type: 'int' })
  cost: number;

  @Column(() => User)
  createdBy: User;
}
