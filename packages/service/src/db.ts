import { createDebuggie } from './libs/debuggie';

const log = createDebuggie('db');

import { Model, knexSnakeCaseMappers } from 'objection';
import Knex from 'knex';

// Initialize knex.
export const knex = Knex({
  client: 'pg',
  useNullAsDefault: true,
  connection: process.env.DATABASE_URL,
  asyncStackTraces: process.env.NODE_ENV === 'development',
  debug: process.env.NODE_ENV === 'development',
  log: {
    warn: log.warn,
    deprecate: log.warn,
    error: log.error,
    debug: log.debug,
  },
  ...knexSnakeCaseMappers(),
});

// Give the knex instance to objection.
Model.knex(knex);
