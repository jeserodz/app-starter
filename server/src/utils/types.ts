import { Request } from "express";
import { Token } from "../models/token";
import { User } from "../models/user";

export interface AppRequest extends Request {
  token?: Token;
  user?: User;
}

export interface GraphqlContext {
  req: AppRequest;
}

export interface AppService {
  create: () => any;
}

export enum Errors {
  CUSTOM_ERROR = "CUSTOM_ERROR"
}
