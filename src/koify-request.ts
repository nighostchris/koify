/**
 * How to use KoifyRequest
 *
 * Example:
 * const getUsersRequest = new KoifyRequest([{
 *    name: 'username',
 *    from: 'params',
 *    type: 'string',
 *    require: true,
 * }, {
 *    name: 'age',
 *    from: 'query',
 *    type: 'number',
 *    validator: () => true,
 *    require: true,
 * }, {
 *    name: 'location',
 *    from: 'body',
 *    type: 'string',
 *    require: false,
 * }]);
 */

import { IRequestVariable } from './interfaces';
import KoifyValidator from './koify-validator';

export class KoifyRequest {
  private variables: IRequestVariable[];

  constructor(variables: IRequestVariable[]) {
    this.variables = variables;
  }

  private static getVariables(rawData: any, desiredVars: IRequestVariable[]): any {
    if (typeof rawData === 'undefined') {
      throw new Error('Cannot get variables from undefined request raw data');
    }

    if (!KoifyValidator.isObject(rawData)) {
      throw new Error(`Input raw data was not object: ${typeof rawData}`);
    }

    const result: any = {};

    desiredVars.forEach((v) => {
      let variable = rawData[v.name];

      if (typeof variable !== 'undefined') {
        switch (v.type) {
          case 'string':
            if (!KoifyValidator.isString(variable)) {
              throw new Error(`Variable '${v.name}' is not a string`);
            }

            variable = String(variable);
            break;
          case 'number':
            try {
              variable = Number(variable);
            } catch (error) {
              throw new Error(error);
            }

            if (!KoifyValidator.isNumber(variable)) {
              throw new Error(`Variable '${v.name}' is not a number`);
            }

            break;
          case 'boolean':
            if (variable === 'true') {
              variable = true;
            }

            if (variable === 'false') {
              variable = false;
            }

            if (typeof variable !== 'boolean') {
              throw new Error(`Variable '${v.name}' is not a boolean`);
            }

            break;
          case 'object':
            if (!KoifyValidator.isObject(variable)) {
              throw new Error(`Variable '${v.name}' is not an object`);
            }

            break;
          case 'array':
            if (!KoifyValidator.isArray(variable)) {
              throw new Error(`Variable '${v.name}' is not an array`);
            }

            break;
          default:
            break;
        }

        if (typeof v.validator !== 'undefined' && typeof v.validator === 'function') {
          if (!v.validator(variable)) {
            throw new Error(`Variable '${v.name}' fails the custom validation`);
          }
        }
      } else if (v.require) {
        throw new Error(`Variable '${v.name}' is required`);
      }

      result[v.name] = variable;
    });

    return result;
  }

  public getParams<T>(ctx: any): T {
    const desiredVars = this.variables.filter((v) => v.from === 'params');
    return KoifyRequest.getVariables(ctx.params, desiredVars);
  }

  public getQuery<T>(ctx: any): T {
    const desiredVars = this.variables.filter((v) => v.from === 'query');
    return KoifyRequest.getVariables(ctx.request.query, desiredVars);
  }

  public getBody<T>(ctx: any): T {
    const desiredVars = this.variables.filter((v) => v.from === 'body');
    return KoifyRequest.getVariables(ctx.request.body, desiredVars);
  }
}

export default KoifyRequest;
