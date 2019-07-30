import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Flavor } from './Flavor';

@Entity()
export class Vendor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  shortName: string;

  @ManyToOne(() => Flavor, (flavor) => flavor.vendor)
  flavors: Flavor[];
}
