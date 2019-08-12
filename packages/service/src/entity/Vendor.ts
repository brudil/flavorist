import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Ingredient } from './Ingredient';

@Entity()
export class Vendor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  shortName: string;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.vendor)
  ingredients: Ingredient[];
}
