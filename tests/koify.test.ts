import Koa from 'koa';
import request from 'supertest';
import Router from '@koa/router';

import { KoifyRouter, KoifyService, KoifyRequest, Post } from '../src';

describe('Koify', () => {
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

  beforeAll(() => {
    app.use(router.routes());
  });

  test ('Testing KoifyRequest + KoifyService + KoifyRouter', async () => {
    await request(app.listen(4000))
      .post('/testing?age=70')
      .send({
        location: 'Hong Kong',
        accounts: [1, 2, 3],
        detail: {
          test: {
            haha: 'hehe',
          },
        },
        isLast: true,
      })
      .expect(200)
      .then((res) => {
        expect(res.body).toStrictEqual({
          username: 'testing',
          age: 70,
          location: 'Hong Kong',
          accounts: [1, 2, 3],
          detail: {
            test: {
              haha: 'hehe',
            },
          },
          isLast: true,
        });
      })
      .catch((err) => console.log(err));
  });
});
