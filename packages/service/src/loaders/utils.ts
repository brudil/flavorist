import DataLoader from 'dataloader';
type LoaderFn<F = any> = (keys: string[]) => Promise<F>;

export const createLoader = (config: { [key: string]: LoaderFn }) => () => {
  const m: any = {};
  Object.entries(config).forEach(([key, loader]) => {
    m[key] = new DataLoader<any, any>((keys) =>
      loader(keys).then((entities) => {
        Object.keys(m).forEach((loaderKey) => {
          if (loaderKey != key) {
            entities.forEach((entity: any) =>
              m[loaderKey].prime(entity[loaderKey], entity),
            );
          }
        });

        return entities;
      }),
    );
  });

  return m;
};
