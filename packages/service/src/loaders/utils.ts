import DataLoader from 'dataloader';
import { keyBy } from 'lodash';
type LoaderFn<I, E> = (keys: I[]) => Promise<E[]>;
type EntityToKey<E, I> = (entity: E) => I;
interface LoaderConfig<I extends any, E extends any> {
  loaderFn: LoaderFn<I, E>;
  entityToKey: EntityToKey<E, I>;
  dataloader: DataLoader<I, E>;
}

const fixReturnOrder = <I, E>(
  keys: I[],
  entities: E[],
  entityToKey: EntityToKey<E, I>,
) => {
  const map = keyBy<E>(entities, (entity) =>
    JSON.stringify(entityToKey(entity)),
  );

  console.log(map);
  return keys.map(
    (key) => map[JSON.stringify(key)] || new Error('entity not found'),
  );
};

export const createEntityLoaderFactory = <E>() => {
  const allLoaders: LoaderConfig<any, any>[] = [];

  const primeAllLoaders = (result: E[]) => {
    allLoaders.forEach((loaderConfig) => {
      result.forEach((resultEntity) => {
        loaderConfig.dataloader.prime(
          JSON.stringify(loaderConfig.entityToKey(resultEntity)),
          resultEntity,
        );
      });
    });
  };

  return <I>(loaderFn: LoaderFn<I, E>, entityToKey: EntityToKey<E, I>) => {
    const dataloader = new DataLoader<I, E>(async (loaderKeys) => {
      console.log(loaderFn.name, loaderKeys);
      const result = await loaderFn(loaderKeys);

      primeAllLoaders(result);

      return fixReturnOrder(loaderKeys, result, entityToKey);
    });

    allLoaders.push({ loaderFn, entityToKey, dataloader });

    return dataloader;
  };
};
