import { Model, ModelOptions, QueryContext } from 'objection';

type Constructor<T> = new (...args: any[]) => T;

interface PluginHooks<M> {
  beforeInsert?: (this: M, queryContext: QueryContext) => Promise<void>;
  beforeUpdate?: (
    this: M,
    modelOptions: ModelOptions,
    queryContext: QueryContext,
  ) => Promise<void>;
}

export const createModelPlugin = <C>(
  pluginConfig: (instanceConfig: C) => PluginHooks<any>,
) => <M>(instanceConfig: C) => {
  const instance = pluginConfig(instanceConfig) as PluginHooks<M>;

  return <T extends Constructor<Model>>(ObjectionModel: T) => {
    return class extends ObjectionModel {
      async $beforeInsert(context: QueryContext) {
        await super.$beforeInsert(context);
        if (instance.beforeInsert !== undefined) {
          await instance.beforeInsert.apply((this as unknown) as M, [context]);
        }
      }

      async $beforeUpdate(modelOptions: ModelOptions, context: QueryContext) {
        await super.$beforeUpdate(modelOptions, context);
        if (instance.beforeUpdate !== undefined) {
          await instance.beforeUpdate.apply((this as unknown) as M, [
            modelOptions,
            context,
          ]);
        }
      }
    };
  };
};
