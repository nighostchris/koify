import { THttpMethod } from "../types";

export interface IRoute {
  // HTTP method like GET, POST, PUT, DELETE, PATCH
  method: THttpMethod,
  // Desired router path, OPTIONAL
  route?: string,
  // Corresponding service handler to resolve results for the route
  handler: string,
};
