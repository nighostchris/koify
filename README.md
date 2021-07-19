# Koify

[![npm version](https://badgen.net/npm/v/koify)](https://www.npmjs.com/package/koify)

[![npm downloads](https://badgen.net/npm/dm/koify)](https://www.npmjs.com/package/koify)

Complete ecosystem that assists you to setup feature-rich service with utilities like logging and database connector that embedded in the package. Based on Koa.js.

## Table of Contents

- [How to Quickly setup a Server](#how-to-quickly-setup-a-server)
- [Utilities](#utilities)
  * [KoifyEnv](#koifyenv)
  * [KoifyDatabase](#koifydatabase)

## How to Quickly setup a Server

```typescript
import Koa from 'koa';
import Router from '@koa/router';

import { KoifyRouter, Get, KoifyService } from 'koify';

const app = new Koa();

class RootService extends KoifyService {
  public pong(ctx: any) {
    return this.success({
      ctx,
      body: { result: 'pong' },
    });
  }
};

const pingRouter = KoifyRouter(
  new Router(),
  new RootService(),
  Get('/ping', 'pong'),
);

app.use(pingRouter.routes());

app.listen(3000);

console.log('Server listening on PORT 3000');
```

## Utilities

### KoifyEnv

Automatically import all environment variables from **.env** file, combine it with default set of env variables provided by users **(optional)** and check if all required variables are defined **(optional)**.

```typescript
interface ApplicationEnv {
  MYSQL_HOST: string,
  MYSQL_USER: string,
  MYSQL_PASSWORD: string,
  MYSQL_DATABASE: string,
}

const envs = <ApplicationEnv>KoifyEnv(undefined, [
  'MYSQL_HOST',
  'MYSQL_USER',
  'MYSQL_PASSWORD',
  'MYSQL_DATABASE',
]);

console.log(envs.MYSQL_HOST);
```

### KoifyDatabase

Using Knex as the foundation, we create a global storage to store all database connection through **KoifyDatabase**.
Support for different database types like MySQL, SQLite and PostgreSQL are coming soon.
Support for **ORM** are coming soon as well.

```typescript
const mysqlDbConfig = {
  client: 'mysql',
  connection: {
    host: envs.MYSQL_HOST,
    user: envs.MYSQL_USER,
    password: envs.MYSQL_PASSWORD,
    database: envs.MYSQL_DATABASE,
  }
};

KoifyDatabase.addConnection(mysqlDbConfig, 'mysql');

const db = new KoifyMySQLDatabase('user', 'mysql');
const result = await db.findAll();
```
