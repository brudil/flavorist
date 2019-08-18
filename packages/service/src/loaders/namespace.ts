import { createLoader } from './utils';
import { getNamespaceById } from '../db/namespace';

export const namespaceLoader = createLoader({
  id: getNamespaceById,
});
