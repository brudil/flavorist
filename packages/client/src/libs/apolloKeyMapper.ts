// Apollo Client 3.0 should have built in support for multiple IDs for entities within the cache
// this is a /bad/ stopgap

import { InMemoryCache } from 'apollo-cache-inmemory';
import { isObject, has, get, sortBy } from 'lodash';
// import {toIdValue} from "apollo-utilities";
// @ts-ignore
import { rIC } from 'idlize/idle-callback-polyfills.mjs';

interface Config {
  [typename: string]: string[][];
}

export const createApolloKeyMapper = (config: Config) => {
  const keyMap = new Map<string, string>();
  (window as any)['keyMap'] = keyMap;

  const runForEntity = (entity: any) => {
    if (!config.hasOwnProperty(entity.__typename)) {
      return;
    }

    const configForTypename = config[entity.__typename];

    for (const configOptionUnsorted of configForTypename) {
      const configOption = sortBy(configOptionUnsorted);

      const missingFields = configOption.reduce(
        (prev, field) => prev || !has(entity, field),
        false,
      );

      if (!missingFields) {
        const keyValues = configOption.map((key) => get(entity, key));
        const key = `${entity.__typename}:${configOption.join(
          '&',
        )}:${keyValues.join('&')}`;

        keyMap.set(key, entity.id);
      }
    }
  };

  return {
    try(
      typename: string,
      value: any,
      keyRewrites: { [input: string]: string } = {},
    ) {
      const values = sortBy(
        Object.entries(value).map((arg) => [
          keyRewrites.hasOwnProperty(arg[0]) ? keyRewrites[arg[0]] : arg[0],
          arg[1],
        ]),
        (a) => a[0],
      );
      const key = `${typename}:${values
        .map((v) => v[0])
        .join('&')}:${values.map((v) => v[1]).join('&')}`;

      if (keyMap.has(key)) {
        console.log('found key for ', key, keyMap.get(key));
        return { __typename: typename, id: keyMap.get(key) };
      }

      return false;
    },

    init(cache: InMemoryCache) {
      // wrap the cache's write method with our own
      const write = cache.write;
      cache.write = (...args: any) => {
        write.apply(cache, args);

        try {
          const perform = (obj: any) => {
            if (obj.hasOwnProperty('__typename')) {
              runForEntity(obj);
            }

            for (const key in obj) {
              if (!obj.hasOwnProperty(key)) {
                continue;
              }

              if (isObject(obj[key])) {
                perform(obj[key]);
              }
            }
          };

          rIC(
            () => {
              Object.values(args[0].result).forEach((value: any) => {
                perform(value);
              });
            },
            { timeout: 400 },
          );
        } catch (e) {
          console.warn(e);
        }
      };
    },
  };
};
