import Application from "koa";
import Router from "@koa/router";

import { TStatusCode } from "../types";

export interface IServiceReponse {
  ctx: Application.ParameterizedContext<any, Router.RouterParamContext<any, {}>, any>,
  body: any,
  statusCode?: TStatusCode,
};
