import { Vendor } from '../entity/Vendor';
import { Ingredient } from '../entity/Ingredient';
import { getConnection } from 'typeorm';
import { createDiscussion } from './discussion';

export async function createIngredient(name: string, vendor: Vendor) {
  const connection = getConnection();

  const flavorEntity = new Ingredient();
  flavorEntity.name = name;
  flavorEntity.vendor = vendor;
  flavorEntity.publicDiscussion = await createDiscussion();

  await connection.getRepository(Ingredient).save(flavorEntity);
}
