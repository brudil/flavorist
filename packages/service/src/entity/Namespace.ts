import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Recipe } from './Recipe';
import { Batch } from './Batch';
import { User } from './User';
import { Team } from './Team';
import { InventoryItem } from './InventoryItem';

export enum NamespaceType {
  User = 1,
  Team = 2,
}

@Entity()
export class Namespace {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: NamespaceType })
  @Column({ unique: true })
  slug: string;

  @OneToMany(() => Recipe, (recipe) => recipe.namespace)
  recipes: Recipe[];

  @OneToMany(() => Batch, (batch) => batch.namespace)
  batches: Batch[];

  @OneToOne(() => User, (user) => user.namespace)
  user: Namespace;

  @OneToOne(() => Team, (team) => team.namespace)
  team: Team;

  @OneToMany(() => InventoryItem, (item) => item.namespace)
  inventoryItems: InventoryItem[];
}
