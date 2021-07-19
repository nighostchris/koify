/**
 * How to use KoifyService
 * 
 * Example:
 * class TestService extends KoifyService {
 *    public pong(ctx: any) {
 *      return this.success({
 *        ctx,
 *        body: { result: 'pong' },
 *      })
 *    }
 * }
 */

import { IServiceReponse } from "./interfaces";

export class KoifyService {
  public success({ ctx, body }: IServiceReponse) {
    ctx.response.status = 200;
    ctx.body = body;
  }

  public error({ ctx, body }: IServiceReponse) {
    ctx.response.status = 500;
    ctx.body = body;
  }

  public custom({ ctx, body, statusCode }: IServiceReponse) {
    if (typeof statusCode !== 'undefined') {
      ctx.response.status = statusCode;
      ctx.body = body;
    } else {
      throw new Error('Undefined HTTP status code for response');
    }
  }
}

export default KoifyService;
