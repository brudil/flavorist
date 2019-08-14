import debug from 'debug';

export const createDebuggie = (namespace: string) => ({
  warn: debug(`flavorist:${namespace}:warn`),
  error: debug(`flavorist:${namespace}:error`),
  debug: debug(`flavorist:${namespace}:debug`),
});
