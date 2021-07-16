# Koify

## How to Quickly setup a Server
```
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
