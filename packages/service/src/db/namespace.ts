import { ID } from '../model/Base';
import { Namespace } from '../model/Namespace';

export async function getNamespaceById(ids: ID[]) {
  return Namespace.query().whereIn('id', ids);
}
