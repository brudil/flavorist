import DataLoader from 'dataloader';
import { keyBy } from 'lodash';
type LoaderFn<F = any> = (keys: string[]) => Promise<F>;

export const createLoader = (config: { [key: string]: LoaderFn }) => () => {
  const allLoaders: any = {};
  Object.entries(config).forEach(([keyedBy, loader]) => {
    allLoaders[keyedBy] = new DataLoader<any, any>((loaderKeys) =>
      loader(loaderKeys).then((entities) => {
        Object.keys(allLoaders).forEach((loaderKey) => {
          if (loaderKey != keyedBy) {
            entities.forEach((entity: any) =>
              allLoaders[loaderKey].prime(entity[loaderKey], entity),
            );
          }
        });

        const entitiesKeyedBy = keyBy(entities, keyedBy);

        return loaderKeys.map(
          (loadedKey) => entitiesKeyedBy[loadedKey] || null,
        );
      }),
    );
  });

  return allLoaders;
};
