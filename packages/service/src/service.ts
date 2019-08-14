import 'reflect-metadata';
import dotenv from 'dotenv';

dotenv.config();

import Hapi from '@hapi/hapi';
import './db';
import { ApolloServer } from 'apollo-server-hapi';
import { schema } from './schema/schema';
import { getViewer } from './db/user';
import { createDebuggie } from './libs/debuggie';
import { createLoaders } from './loaders';

const log = createDebuggie('server');

const init = async () => {
  const server = new ApolloServer({
    schema,
    context: (r) => ({
      request: r.request,
      auth: r.request.auth.credentials,
      loaders: createLoaders(),
    }),
  });

  const app = new Hapi.Server({
    port: process.env.PORT,
    host: process.env.HOST,
    state: {
      strictHeader: false,
    },
  });

  await app.register(require('@hapi/cookie'));

  app.auth.strategy('session', 'cookie', {
    cookie: {
      name: 'flavorist-app',
      password: '!wsYhFA*C2U6nz=Bu^%A@^F#SF3&kSR6',
      isSecure: false,
    },
    redirectTo: false,
    validateFunc: async (_request: unknown, session: any) => {
      try {
        const account = await getViewer(session.id);
        if (!account) {
          return { valid: false };
        }

        return { valid: true, credentials: account };
      } catch (e) {
        log.error(e);
        return { valid: false };
      }
    },
  });

  app.auth.default({ strategy: 'session', mode: 'try' });

  await server.applyMiddleware({
    app,
  });

  await server.installSubscriptionHandlers(app.listener);

  await app.start();
  log.debug(`Server running on ${app.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  log.error(err);
  process.exit(1);
});

init();
