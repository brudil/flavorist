import { Flavor } from './types';

const endingFlavor = / ?flavor ?$/i;
const endingFlavorConcentrate = / ?flavor concentrate ?$/i;
const endingVolume = / ?([0-9].)ml ?$/i;
const endingPg = /\(PG\)/i;

export const sanitiseName = (flavor: Flavor) => {
  const name = flavor.name
    .replace('**', '')
    .replace(endingFlavorConcentrate, '')
    .replace(endingFlavor, '')
    .replace(endingVolume, '')
    .replace(endingPg, '')
    .trim();

  return {
    ...flavor,
    name,
  };
};
