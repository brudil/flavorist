import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Ingredient } from './Ingredient';

@Entity()
export class Vendor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  shortName: string;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.vendor)
  ingredients: Ingredient[];
}
