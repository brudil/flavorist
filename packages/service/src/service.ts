import 'reflect-metadata';
import * as dotenv from 'dotenv';

dotenv.config();

import * as Hapi from '@hapi/hapi';
import { setupDb } from './db';
import { ApolloServer } from 'apollo-server-hapi';
import { schema } from './schema/schema';

const init = async () => {
  setupDb();
  const server = new ApolloServer({
    schema,
    context: (req) => ({
      req,
    }),
  });

  const app = new Hapi.Server({
    port: process.env.PORT,
    host: process.env.HOST,
  });

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
