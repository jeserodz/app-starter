import { Resolver, Query, Mutation, Arg, Ctx, Authorized } from "type-graphql";
import { UserService } from "../services/user.service";
import { Token } from "../models/token";
import { User } from "../models/user";
import { GraphqlContext } from "../utils/types";

@Resolver()
export class UserResolver {
  @Authorized()
  @Query(returns => User)
  async user(@Arg("id") id: number) {
    return await UserService.get(id);
  }

  @Authorized()
  @Query(returns => User)
  async me(@Ctx() ctx: GraphqlContext) {
    return ctx.req.user;
  }

  @Mutation(returns => User)
  async createUser(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Arg("displayName", { nullable: true }) displayName: string,
    @Arg("email", { nullable: true }) email: string
  ) {
    return await UserService.create({ username, password, displayName, email });
  }

  @Mutation(returns => Token)
  async login(@Arg("username") username: string, @Arg("password") password: string) {
    return await UserService.login(username, password);
  }
}
