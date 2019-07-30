import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Flavor } from './Flavor';
import { User } from './User';

@Entity()
export class InventoryItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Flavor, (flavor) => flavor.inventory)
  flavor: Flavor;

  @ManyToOne(() => User, (user) => user.inventory)
  user: User;
}
