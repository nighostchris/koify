# Koify

[![npm version](https://badgen.net/npm/v/koify)](https://www.npmjs.com/package/koify)

[![npm downloads](https://badgen.net/npm/dm/koify)](https://www.npmjs.com/package/koify)

Complete ecosystem that assists you to setup feature-rich service with utilities like logging and database connector that embedded in the package. Based on Koa.js.

## Table of Contents

- [Web Server](#web-server)
  * [KoifyRouter](#koifyrouter)
  * [KoifyService](#koifyservice)
  * [KoifyRequest](#koifyrequest)
  * [How to Quickly setup a Server](#how-to-quickly-setup-a-server)
- [Utilities](#utilities)
  * [KoifyEnv](#koifyenv)
  * [KoifyDatabase](#koifydatabase)
  * [KoifyValidator](#koifyvalidator)

## Web Server

### KoifyRouter
Define the routes for the whole web server. Usually being used together with **KoifyService** and **KoifyRequest**.

```typescript
const router = KoifyRouter(
  new Router(),
  new TestService(),
  Post('/:username', 'test'),
);

app.use(router.routes());
```

### KoifyService
Define the handler for **KoifyRouter** route endpoints and make use of **KoifyRequest** to get variables input from request easily.

```typescript
class TestService extends KoifyService {
  public test(ctx: any) {
    const { username } : { username: string } = getUsersRequest.getParams(ctx);
    const { age } : { age: number } = getUsersRequest.getQuery(ctx);
    const {
      location, accounts, detail, isLast,
    } : {
      location: string,
      accounts: any[],
      detail: any,
      isLast: boolean,
    } = getUsersRequest.getBody(ctx);

    return this.success({
      ctx,
      body: { username, age, location, accounts, detail, isLast },
    });
  }
};
```

### KoifyRequest

Define the fields you expect to receive from either **query**, **params** or **body** from request. Validation of desired data type and custom validation function will be performed on the field automatically.

```typescript
const getUsersRequest = new KoifyRequest([{
  name: 'username',
  from: 'params',
  type: 'string',
  require: true,
}, {
  name: 'age',
  from: 'query',
  type: 'number',
  validator: () => true,
  require: true,
}, {
  name: 'location',
  from: 'body',
  type: 'string',
  require: false,
}, {
  name: 'accounts',
  from: 'body',
  type: 'array',
  require: false,
}, {
  name: 'detail',
  from: 'body',
  type: 'object',
  require: false,
}, {
  name: 'isLast',
  from: 'body',
  type: 'boolean',
  require: false,
}]);
```

### Example on Setting up a Web Server

```typescript
import Koa from 'koa';
import Router from '@koa/router';

import { KoifyRouter, Get, KoifyService } from 'koify';

const app = new Koa();

const getUsersRequest = new KoifyRequest([{
  name: 'username',
  from: 'params',
  type: 'string',
  require: true,
}, {
  name: 'age',
  from: 'query',
  type: 'number',
  validator: () => true,
  require: true,
}, {
  name: 'location',
  from: 'body',
  type: 'string',
  require: false,
}, {
  name: 'accounts',
  from: 'body',
  type: 'array',
  require: false,
}, {
  name: 'detail',
  from: 'body',
  type: 'object',
  require: false,
}, {
  name: 'isLast',
  from: 'body',
  type: 'boolean',
  require: false,
}]);

class TestService extends KoifyService {
  public test(ctx: any) {
    const { username } : { username: string } = getUsersRequest.getParams(ctx);
    const { age } : { age: number } = getUsersRequest.getQuery(ctx);
    const {
      location, accounts, detail, isLast,
    } : {
      location: string,
      accounts: any[],
      detail: any,
      isLast: boolean,
    } = getUsersRequest.getBody(ctx);

    return this.success({
      ctx,
      body: { username, age, location, accounts, detail, isLast },
    });
  }
};

const router = KoifyRouter(
  new Router(),
  new TestService(),
  Post('/:username', 'test'),
);

app.use(router.routes());

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
Support for different database types like MySQL, SQLite and PostgreSQL.
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

const db = new KoifyRelationalDatabase('user', 'mysql');
const result = await db.findAll();
```

### KoifyValidator

Easy-to-use utility class for you to validate the data type of your input.

```typescript
KoifyValidator.isInteger('3');
// --> true
KoifyValidator.isInteger(3.2);
// --> false
KoifyValidator.isFloat(3.2);
// --> true
KoifyValidator.isFloat('3');
// --> false
KoifyValidator.isString(3);
// --> false
KoifyValidator.isString('testing');
// --> true
KoifyValidator.isObject({ c: 4, d: 5 });
// --> true
KoifyValidator.isObject(null);
// --> false
KoifyValidator.isObject([1, 2, 3]);
// --> false
KoifyValidator.isArray([1, 2, 3]);
// --> true
KoifyValidator.isArray(null);
// --> false
```
