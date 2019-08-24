import { createEntityLoaderFactory } from './utils';
import { getNamespaceById } from '../db/namespace';
import { ID } from '../model/Base';
import { Namespace } from '../model/Namespace';

export const createNamespaceLoaders = () => {
  const createNamespaceLoader = createEntityLoaderFactory<Namespace>();

  return {
    namespaceById: createNamespaceLoader<ID>(
      getNamespaceById,
      (namespace) => namespace.id,
    ),
  };
};
