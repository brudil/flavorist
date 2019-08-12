import 'reflect-metadata';
import * as dotenv from 'dotenv';

dotenv.config();

import * as Hapi from '@hapi/hapi';
import { setupDb } from './db';
import { ApolloServer } from 'apollo-server-hapi';
import { schema } from './schema/schema';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from './entity/User';

const init = async () => {
  await setupDb();
  const server = new ApolloServer({
    schema,
    context: (request) => ({
      server: request,
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
      const userRepo = getCustomRepository(UserRepository);

      const account = await userRepo.findOne(session.id, {
        relations: ['namespace'],
      });

      if (!account) {
        return { valid: false };
      }

      return { valid: true, credentials: account };
    },
  });

  app.auth.default({ strategy: 'session', mode: 'try' });

  await server.applyMiddleware({
    app,
  });

  await server.installSubscriptionHandlers(app.listener);

  await app.start();
  console.log(`Server running on ${app.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
