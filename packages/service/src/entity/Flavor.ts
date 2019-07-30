import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Discussion } from './Discussion';
import { Vendor } from './Vendor';
import { InventoryItem } from './InventoryItem';
import { FlavorUse } from './FlavorUse';

@Entity()
export class Flavor {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Discussion)
  discussion: number;

  @ManyToOne(() => Vendor, (vendor) => vendor.flavors)
  vendor: Vendor;

  @OneToMany(() => InventoryItem, (inventoryItem) => inventoryItem.flavor)
  inventory: InventoryItem[];

  @Column()
  name: string;

  @OneToMany(() => FlavorUse, (use) => use.flavor)
  flavorUse: FlavorUse[];
}
