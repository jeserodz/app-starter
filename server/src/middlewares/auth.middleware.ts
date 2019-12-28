/******************************************************************************
 * Authentication Middleware
 *
 * - Reads JWT token from Authorization HTTP header and loads the user
 *   information from the database into the Request object.
 ******************************************************************************/

import { Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppRequest, GraphqlContext } from "../utils/types";
import { UserService } from "../services/user.service";
import { AuthChecker } from "type-graphql";

export async function AuthMiddleware(req: AppRequest, res: Response, next: NextFunction) {
  if (req.headers.authorization) {
    const jwt = req.headers.authorization.replace("Basic ", "");
    const decoded: any = verify(jwt, "secret");
    console.log("JWT decoded: ", JSON.stringify(decoded));
    const user = await UserService.getByUsername(decoded.username);
    req.user = user;
  }
  return next();
}

export const GraphqlAuthChecker: AuthChecker<GraphqlContext> = ({ context }, roles) => {
  if (!context.req.user) {
    return false;
  }

  return true;
};
