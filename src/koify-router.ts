/**
 * How to use KoifyRouter
 * 
 * KoifyRouter(router: Router, service: KoifyService, ...routes: IRoute[])
 * 
 * Example:
 * KoifyRouter(
 *    new Router(),
 *    handlerService, 
 *    Get('getAllAccounts'),
 *    Post('/add', 'addAccount')
 * )
 */

import Router from '@koa/router';

import { IRoute } from './interfaces';

export function KoifyRouter(router: Router, service: any, ...routes: IRoute[]) {
  routes.forEach((route: IRoute) => {
    router[route.method](route.route || '/', async (ctx, next) => {
      try {
        // Return result inside service function by
        // ctx.body = { <results> }
        // ctx.status = 200 for success, other HTTP erro
        service[route.handler](ctx);
      } catch (error) {
        throw new Error('Handler function missing in the service');
      }
    });
  });
}

export function Get(handler: string): IRoute;

export function Get(route: string, handler: string): IRoute;

export function Get(...params: string[]): IRoute {
  if (params.length === 1) {
    return { method: 'get', handler: params[0] };
  }

  if (params.length === 2) {
    return { method: 'get', route: params[0], handler: params[1] };
  }

  throw new Error('Invalid number of params detected.');
}

export function Post(handler: string): IRoute;

export function Post(route: string, handler: string): IRoute;

export function Post(...params: string[]): IRoute {
  if (params.length === 1) {
    return { method: 'post', handler: params[0] };
  }

  if (params.length === 2) {
    return { method: 'post', route: params[0], handler: params[1] };
  }

  throw new Error('Invalid number of params detected.');
}

export function Put(handler: string): IRoute;

export function Put(route: string, handler: string): IRoute;

export function Put(...params: string[]): IRoute {
  if (params.length === 1) {
    return { method: 'put', handler: params[0] };
  }

  if (params.length === 2) {
    return { method: 'put', route: params[0], handler: params[1] };
  }

  throw new Error('Invalid number of params detected.');
}

export function Delete(handler: string): IRoute;

export function Delete(route: string, handler: string): IRoute;

export function Delete(...params: string[]): IRoute {
  if (params.length === 1) {
    return { method: 'delete', handler: params[0] };
  }

  if (params.length === 2) {
    return { method: 'delete', route: params[0], handler: params[1] };
  }

  throw new Error('Invalid number of params detected.');
}

export function Patch(handler: string): IRoute;

export function Patch(route: string, handler: string): IRoute;

export function Patch(...params: string[]): IRoute {
  if (params.length === 1) {
    return { method: 'patch', handler: params[0] };
  }

  if (params.length === 2) {
    return { method: 'patch', route: params[0], handler: params[1] };
  }

  throw new Error('Invalid number of params detected.');
}
