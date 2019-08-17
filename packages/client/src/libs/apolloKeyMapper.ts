// Apollo Client 3.0 should have built in support for multiple IDs for entities within the cache
// this is a /bad/ stopgap

import { InMemoryCache } from 'apollo-cache-inmemory';
import { isObject } from 'lodash';
// import {toIdValue} from "apollo-utilities";
// @ts-ignore
import { rIC } from 'idlize/idle-callback-polyfills.mjs';

interface Config {
  [typename: string]: string[][];
}

export const createApolloKeyMapper = (config: Config) => {
  const keyMap = new Map<string, string>();

  const runForEntity = (entity: any) => {
    if (!config.hasOwnProperty(entity.__typename)) {
      return;
    }

    const configForTypename = config[entity.__typename];

    for (const configOption of configForTypename) {
      const missingFields = configOption.reduce(
        (prev, field) => prev || !entity.hasOwnProperty(field),
        false,
      );

      if (!missingFields) {
        const keyValues = configOption.map((key) => entity[key]);
        keyMap.set(
          `${entity.__typename}:${configOption.join('&')}:${keyValues.join(
            '&',
          )}`,
          entity.id,
        );
      }
    }
  };

  return {
    try(value: any) {
      console.log('attempting from keyMap', value);
      // const key = `User:username:${obj.username}`;
      // console.log('cache redirect', obj, key);
      //
      // if (obj.hasOwnProperty('username')) {
      //     if (keyMap.hasOwnProperty(key)) {
      //         console.log(keyMap[key]);
      //         return toIdValue(keyMap[key]);
      //     }
      // }
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
