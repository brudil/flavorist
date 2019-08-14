import { Ingredient } from './Ingredient';
import { BaseModel } from './Base';
import { IsString } from 'class-validator';

export class Vendor extends BaseModel {
  static get tableName() {
    return 'vendor';
  }

  @IsString()
  name: string;

  @IsString()
  shortName: string;

  //@OneToMany(() => Ingredient, (ingredient) => ingredient.vendor)
  ingredients: Ingredient[];
}
